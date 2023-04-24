const relocateLinkSlashes = (link) => {
    const finalLink = link
        .replaceAll("%2F", "/")
        .replaceAll("%3A", "/")
    return finalLink
}

const checkLink = (url) => {
    console.log("URL", url)
    const linkWithSlashes = relocateLinkSlashes(url)
    console.log("Link with slashes", linkWithSlashes)

    const finalLink = (
        linkWithSlashes.includes("https://www.") ||
        linkWithSlashes.includes("http://www.")
    ) ? linkWithSlashes
    : `https://www.${ linkWithSlashes }`

    return finalLink
}

module.exports = { checkLink }