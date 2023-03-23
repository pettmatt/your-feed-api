const express = require('express')
const router = express.Router()

app.get("/fetch/:url", (req, res, next) => {
    return res.status(200).json({
        message: `Hello from path! The url ${ url }`,
    })
})

module.exports = router