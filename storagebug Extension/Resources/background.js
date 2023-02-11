browser.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
    if (request.greeting === "hello")
        browser.storage.local.set({"currenttime": new Date().toISOString()}).then(_ => {
            browser.storage.local.get("currenttime").then(s => {
                sendResponse(s.currenttime);
            })
        })
    // Tell sender that sendResponse will be called after the listener has returned.
    // See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_an_asynchronous_response_using_sendresponse
    return true
});
