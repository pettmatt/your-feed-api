const serverless = require("serverless-http")
const express = require("express")
const app = express()

const basicRoute = require("./routes/basic")
// const fetchRoute = require("./routes/fetch")

app.use("/", basicRoute)

module.exports.handler = serverless(app)