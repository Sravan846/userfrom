const express = require('express');
const userRouter = require('./user');
const formRouter = require('./form');
const verifytoken = require('../middleware/auth');


const mainRouter = express.Router();
mainRouter.use("/user", userRouter)
mainRouter.use("/form",verifytoken, formRouter)

module.exports = mainRouter