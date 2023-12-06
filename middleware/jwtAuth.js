const jwt = require('jsonwebtoken');

const checkRoleAuth = (roles) => async (req, res, next) => {
        const token = req.headers.authorization.split(' ').pop() //obtain token from headers
        //const token = req.cookies.jwt; //obtain token from cookie

        if (!token) {
            return res.status(403).send({ error: 'Unauthorized: No token provided' });
        }
        try {
        //to verify the token
        const tokenData= jwt.verify(token, process.env.JWT_SECRET);
        //const tokenData = await verifyToken(token);

        if (!tokenData || !tokenData.roleId) {
            return res.status(401).send({ error: 'Unauthorized: Invalid token' });
        }
         // To obtein the user rol of the token
         const userRoleId = tokenData.roleId;
         const requireRole = roles

         // checks if the user's role has permission to access the endpoint  
        if (!requireRole.includes(userRoleId)) {
            return res.status(403).send({ error: 'Forbidden: Insufficient permissions' });
        }
        // If the user has the appropriate role, allow access to the route
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
        

module.exports = checkRoleAuth;