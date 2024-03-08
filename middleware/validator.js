const joi = require('joi');
module.exports = {
    registerSchema: (req, res, next) => {
        try {
            const schema = joi.object({
                name: joi.string().required().label("name"),
                email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).label("email"),
                password: joi.string().required().label("password"),
            })
            const { error } = schema.validate(req.body)
            if (error) {
                res.status(400).json({ message: error.message, isSuccess: false })
            } else {
                next()
            }
        } catch (error) {
            res.status(400).json({ message: error.message, isSuccess: false })
        }
    },
    loginSchema: (req, res, next) => {
        try {
            const schema = joi.object({
                email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).label("email"),
                password: joi.string().required().label("password"),
            })
            const { error } = schema.validate(req.body)
            if (error) {
                res.status(400).json({ message: error.message, isSuccess: false })
            } else {
                next()
            }
        } catch (error) {
            res.status(400).json({ message: error.message, isSuccess: false })
        }
    },
    formSchema: (req, res, next) => {
        try {
            const schema = joi.object({
                title: joi.string().required().label("Title"),
                fields: joi.array().items({
                    question:joi.string(),
                    answer:joi.string()
                }).label("fields"),
            })
            const { error } = schema.validate(req.body)
            if (error) {
                res.status(400).json({ message: error.message, isSuccess: false })
            } else {
                next()
            }
        } catch (error) {
            res.status(400).json({ message: error.message, isSuccess: false })
        }
    }
}