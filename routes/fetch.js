const scrapeArticle = require("../services/scraper")
const express = require("express")
const router = express.Router()

router.get("/fetch/:url", async (req, res, next) => {
    const url = (
        req.params.url.includes("https://www.") ||
        req.params.url.includes("http://www.") 
    ) ? req.params.url
    : `http://www.${ req.params.url }`

    const articles = await scrapeArticle(url)

    return res.status(200).json({
        message: `Hello from fetch!`,
        articles,
    })
})

module.exports = router