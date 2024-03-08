const mongoose = require("mongoose");

const new_mongoose = new mongoose.Schema({
    title: {
        type: String,
    },
    fields: [{
        question: String,
        answer: String
    }],
    createdby: {
        type: mongoose.Types.ObjectId,
        ref:"user"
    },
}, { timestamps: true });


const formSchema = mongoose.model("form", new_mongoose);
module.exports = formSchema;
