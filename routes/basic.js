const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "API is functional",
    })
})

router.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    })
})
  
router.use((req, res, next) => {
    return res.status(400).json({
        error: "Bad request",
    })
})

module.exports = router