browser.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    browser.storage.local.get("history").then(s => {
        sendResponse(s.history);
    })
    // Tell sender that sendResponse will be called after the listener has returned.
    // See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_an_asynchronous_response_using_sendresponse
    return true
});


const tabUpdated = async (_, changeInfo, tab) => {
  if (changeInfo.status != "complete") {
    return;
  }

  browser.storage.local.get("history").then(r => {
  if(r.history) {
    r.history.push(tab.url)
      browser.storage.local.set({"history": r.history})
    } else {
      browser.storage.local.set({"history": [tab.url]})
    }
  })
};



browser.tabs.onUpdated.addListener(async (...e) => {
  await tabUpdated(...e);
});
