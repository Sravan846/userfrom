const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL,)
mongoose.connection.once("open", () => { console.log("db is connected"); })
mongoose.connection.on("error", (err) => {
    console.log("databse error", err);
})