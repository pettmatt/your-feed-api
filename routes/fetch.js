const scrapeArticle = require("../services/scraper")
const express = require("express")
const router = express.Router()

router.get("/fetch/:url/:ignoreDate", async (req, res, next) => {
    const url = (
        req.params.url.includes("https://www.") ||
        req.params.url.includes("http://www.") 
    ) ? req.params.url
    : `http://www.${ req.params.url }`

    const ignoreBeforeDate = req.params.ignoreDate
    console.log("Ignore", ignoreBeforeDate)
    const articles = await scrapeArticle(url, ignoreBeforeDate)

    return res.status(200).json({
        message: `Hello from fetch!`,
        articles,
    })
})

module.exports = router