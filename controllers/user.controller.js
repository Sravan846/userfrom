const userSchema = require('../model/user');
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        try {
            const { email } = req.body
            const checkmail = await userSchema.findOne({ email })
            if (checkmail) {
                return res.status(401).json({ message: "this email is already used", isSuccess: false })
            }
            const newUser = new userSchema(req.body)
            newUser.save().then((result) => {
                return res.status(200).json({ message: "user is register", isSuccess: true })
            }).catch((err) => {
                return res.status(400).json({ message: err.message, isSuccess: false })
            });
        } catch (error) {
            return res.status(500).json({ message: err.message, isSuccess: false })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const checkmail = await userSchema.findOne({ email })
            if (checkmail) {
                const isMatch =await bcrypt.compare(password,checkmail.password)
                if (isMatch) {
                    const token = await checkmail.generateAuthToken()
                    res.status(200).json({ message: "login successfully", token, isSuccess: true })
                }
                else {
                    return res.status(401).json({ message: "Password is worng", isSuccess: false })
                }
            } else {
                return res.status(401).json({ message: "email is worng", isSuccess: false })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
}