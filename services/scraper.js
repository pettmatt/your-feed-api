const puppeteer = require("puppeteer")

const scrapeArticles = async (url, ignoreBeforeDate = null) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    // The ignoreBeforeDate value is passed as the second argument to the function.
    // Without including the variable, the program is going to prompt an error, which tells the variable haven't been defined.
    // Read more about this from Puppeteer docs: https://pptr.dev/api/puppeteer.page.evaluate
    // const articles = await page.evaluate((ignoreBeforeDate) =>
    //     Array
    //         .from(document.querySelectorAll(".article"))
    //         .map(article => {
    //             const object = {
    //                 url: "",
    //                 img: {
    //                     src: null,
    //                     alt: ""
    //                 },
    //                 header: "",
    //                 paragraph: "",
    //                 published: null
    //             }

    //             object.published = article.querySelector("time").getAttribute("datetime")

    //             // Check if the article is out of scope. There is an option to ignore articles based on the date.
    //             if ( ignoreBeforeDate !== null && object.published !== null )
    //                 if ( new Date(object.published) < new Date(ignoreBeforeDate) )
    //                     return

    //             object.url = article.querySelector("a").getAttribute("href")
    //             object.img.src = article.querySelector("img").getAttribute("href")
    //             object.img.alt = article.querySelector("img").getAttribute("alt")
    //             object.header = article.querySelector("h3").textContent.trim()
    //             object.paragraph = article.querySelector("p").textContent.trim()

    //             return object
    //         }), ignoreBeforeDate
    // )

    browser.close()

    return articles
}

const scrapeArticleSnippet = async (url) => {
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

const basicScraping = async (page) => {
    await page.evaluate((ignoreBeforeDate) =>
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
                    paragraph: "",
                    published: null
                }

                object.published = article.querySelector("time").getAttribute("datetime")

                // Check if the article is out of scope. There is an option to ignore articles based on the date.
                if ( ignoreBeforeDate !== null && object.published !== null )
                    if ( new Date(object.published) < new Date(ignoreBeforeDate) )
                        return

                object.url = article.querySelector("a").getAttribute("href")
                object.img.src = article.querySelector("img").getAttribute("href")
                object.img.alt = article.querySelector("img").getAttribute("alt")
                object.header = article.querySelector("h3").textContent.trim()
                object.paragraph = article.querySelector("p").textContent.trim()

                return object
            }), ignoreBeforeDate
    )
}

module.exports = { scrapeArticles, scrapeArticleSnippet }