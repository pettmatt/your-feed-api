const { scrapeArticles, scrapeArticleSnippet } = require("../services/scraper")
const { checkLink } = require("../services/linkProcessing")
const express = require("express")
const router = express.Router()

router.get("/fetch/:url", async (req, res, next) => {
    const url = checkLink(req.params.url)

    const articles = await scrapeArticles(url)

    return res.status(200).json({ articles })
})

router.get("/fetch/:url/:ignoreDate", async (req, res, next) => {
    const url = checkLink(req.params.url)

    const ignoreBeforeDate = req.params.ignoreDate
    const articles = await scrapeArticles(url, ignoreBeforeDate)

    return res.status(200).json({ articles })
})

router.get("/fetch/single/:url", async (req, res, next) => {
    const url = checkLink(req.params.url)
    const articles = await scrapeArticleSnippet(url)

    return res.status(200).json({ articles })
})

module.exports = router
