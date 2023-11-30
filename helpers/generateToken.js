const jwt = require('jsonwebtoken') 

const tokenSign = async (user) => { //Generate Token
    return jwt.sign(
        {
            _id: user._id,
            roleId: user.roleId
        }, //Payload 
        process.env.JWT_SECRET, //.env
        {
            expiresIn: "2h", //life time
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { // Check if token is valid and correct
    return jwt.decode(token, null)
}

module.exports = { tokenSign, decodeSign, verifyToken }