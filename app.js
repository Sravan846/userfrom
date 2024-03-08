const express = require('express');
const cors = require('cors');
require("dotenv").config()
require("./config/db")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api", require("./routes"))

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("server is stated")
})