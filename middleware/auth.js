const jwt = require("jsonwebtoken");
const userSchema = require('../model/user');
const verifytoken = async function checkUserOrAdmin(req, res, next) {
    try {
      let token = req.header('Authorization');
      token=token.split(" ")[1]
      const verifyUser = jwt.verify(token, process.env.TOKEN_CODE);
      const user = await userSchema.findOne({ _id: verifyUser.data._id });
      req.user = user;
      next();
    } catch (error) {
      res.send({ message: "Invalid Token", isSuccess: false });
    }
  }
  
  module.exports = verifytoken;