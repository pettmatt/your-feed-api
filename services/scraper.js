const puppeteer = require("puppeteer")

const scrapeArticle = async (url) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const articles = await page.evaluate(() =>
        Array
            .from(document.querySelectorAll(".article"))
            .map(article => {
                const object = {
                    url: "",
                    img: {
                        src: null,
                        alt: ""
                    },
                    header: "",
                    paragraph: ""
                }

                object.url = article.querySelector("a").getAttribute("href")
                object.img.src = article.querySelector("img").getAttribute("href")
                object.img.alt = article.querySelector("img").getAttribute("alt")
                object.header = article.querySelector("h3").textContent.trim()
                object.paragraph = article.querySelector("p").textContent.trim()

                return object
            })
    )

    browser.close()

    return articles
}

module.exports = scrapeArticle