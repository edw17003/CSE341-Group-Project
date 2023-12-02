const { encrypt, compare } = require('../helpers/handleBcrypt');
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/User')

//login
const loginCtrl = async (req, res) => {
        try {
        const {email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(404)
            res.send({error: "User not found"})
        }

        const checkPassword = await compare(password, user.password)
        //JWT
        const tokenSession = await tokenSign(user);

        if (checkPassword) {
            res.send({
                data: user,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
           res.status(409);
           res.send({
                error: "Invalid password"
            })
            return
        }
    } catch (error) {
        console.log(error);
        res.status(500)
        res.send({error: "an error occurred"})
    }
};

//register user
const registerCtrl = async (req, res) => {
    try {
        const {email, password, username} =req.body
        const passwordHash = await encrypt(password)
        const registerUser = await userModel.create({
            email,
            username,
            password: passwordHash
        })
        res.send({data: registerUser})
    } catch (error) {
        console.error(error);
        res.status(500)
        res.send({error: "an error occurred"})
    }
}

module.exports = { loginCtrl, registerCtrl };

