const relocateLinkSlashes = (link) => {
    const finalLink = link.replaceAll("%20", "/") 
    return finalLink
}

const checkLink = (url) => {
    console.log(url)
    const linkWithSlashes = relocateLinkSlashes(url)
    const finalLink = (
        linkWithSlashes.includes("https://www.") ||
        linkWithSlashes.includes("http://www.")
    ) ? linkWithSlashes
    : `https://www.${ linkWithSlashes }`

    return finalLink
}

module.exports = { checkLink }