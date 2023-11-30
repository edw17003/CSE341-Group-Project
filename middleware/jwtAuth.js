const { verifyToken } = require('../helpers/generateToken')
const userModel = require('../models/User')

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop() //obtain token from headers
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized: No token provided' });
        }

        const tokenData = await verifyToken(token);
        if (!tokenData || !tokenData._id) {
            return res.status(401).send({ error: 'Unauthorized: Invalid token' });
        }
        
        const userData = await userModel.findById(tokenData._id)

        if (!userData || ![].concat(roles).includes(userData.role)) {
            return res.status(403).send({ error: 'Forbidden: Insufficient permissions' });
        }

        // If user has the adequate role, next layer
        next();

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ').pop(); // Obtener el token del encabezado

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized: No token provided' });
        }

        const tokenData = await verifyToken(token);

        if (!tokenData || !tokenData._id) {
            return res.status(401).send({ error: 'Unauthorized: Invalid token' });
        }

        // if there is a ID in the token, the next layer
        next();

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = {checkRoleAuth, checkAuth};