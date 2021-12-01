function logResponse(responseDetails){
    var jsonData = {};
    jsonData["url"] = responseDetails.url;
    jsonData["statusCode"] = responseDetails.statusCode;
    jsonData["statusLine"] = responseDetails.statusLine;
    jsonData["ip"] = responseDetails.ip;
    console.log(JSON.stringify(jsonData)); 
}

// Reference: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onResponseStarted
browser.webRequest.onResponseStarted.addListener(
  logResponse,
  {urls: ["<all_urls>"]}
);
