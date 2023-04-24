const { ssr } = require("./puppeteerProcesses.js")
const puppeteer = require("puppeteer")

let WSEndpoint = null

const scrapeArticles = async (url, ignoreBeforeDate = null) => {
    if ( !WSEndpoint ) {
        const browser = await puppeteer.launch()
        WSEndpoint = browser.wsEndpoint()
    }

    const articles = ssr(url, ignoreBeforeDate, WSEndpoint)

    return articles
}

const scrapeArticleSnippet = async (url) => {
    // Needs to be modified when debugging is done.
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const articles = await page.evaluate((url) =>
        Array
            .from(document.querySelector("article"))
            .map(article => {
                const object = {
                    url: url,
                    img: {
                        src: null,
                        alt: ""
                    },
                    header: "",
                    paragraph: "",
                }

                object.img.src = article.querySelector("img").getAttribute("href")
                object.img.alt = article.querySelector("img").getAttribute("alt")
                object.paragraph = article.querySelectorAll("p").slice(0, 3).textContent.trim()

                return object
            }), url
    )

    browser.close()

    return articles
}

module.exports = { scrapeArticles, scrapeArticleSnippet }