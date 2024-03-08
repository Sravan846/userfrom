const express = require('express');
const formCTRL = require('../controllers/form.contoller');
const validate = require('../middleware/validator');

const formRouter = express.Router();
formRouter.post("/add", validate.formSchema, formCTRL.newForm)
formRouter.get("/", formCTRL.getAllForms)
formRouter.get("/:fid", formCTRL.getFormById)
formRouter.put("/:fid", validate.formSchema, formCTRL.updateFormById)
formRouter.delete("/:fid",  formCTRL.deleteFormById)

module.exports = formRouter