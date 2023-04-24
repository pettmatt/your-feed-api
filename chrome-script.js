const launchChrome = require("@serverless-chrome/lambda")
const request = require("superagent")
 
// Takes care of building the necessary binaries for Chrome and 
// that Chrome is running when serverless function is being executed.

module.exports.getChrome = async () => {
    const chrome = await launchChrome()
    
    const response = await request
        .get(`${ chrome.url }/json/version`)
        .set("Content-Type", "application/json")
    
    const endpoint = response.body.webSocketDebuggerUrl
    
    return {
        endpoint,
        instance: chrome
    }
}