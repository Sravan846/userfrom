const express = require('express');
const userCTRL = require('../controllers/user.controller');
const validate = require('../middleware/validator');

const userRouter = express.Router();
userRouter.post("/register", validate.registerSchema, userCTRL.register)
userRouter.post("/login", validate.loginSchema, userCTRL.login)

module.exports = userRouter