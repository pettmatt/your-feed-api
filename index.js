const fetchRoute = require("./routes/fetch")
const serverless = require("serverless-http")
const express = require("express")
const app = express()


app.use("/", fetchRoute)

app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "API is functional",
    })
})

app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    })
})
  
app.use((req, res, next) => {
    return res.status(400).json({
        error: "Bad request",
    })
})

module.exports.handler = serverless(app)