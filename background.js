let certInfo = null;
let certMap = new Map();

async function logCert(details) {
  try {
    let securityInfo = await browser.webRequest.getSecurityInfo(details.requestId, {});
    const url = details.url;
    console.log(url);
    if (securityInfo.state === 'secure' || securityInfo.state === 'weak') {
      // console.log(securityInfo.certificates[0].subject);
      // console.log(securityInfo.certificates[securityInfo.certificates.length - 1].issuer);
      // console.log(securityInfo.certificates[0]);
      certInfo = securityInfo;
      certMap.set(url, securityInfo);
    } else {
      certInfo = null;
    }
  } catch (error) {
    console.error(error);
    // certInfo = null;
  }
}

// Log certificate info when headers are received
browser.webRequest.onHeadersReceived.addListener(logCert, { urls: ['<all_urls>'] }, ['blocking']);

// Send certificate map when popup is called
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request === 'getDetails') {
    // sendResponse(certInfo);
    sendResponse(certMap);
  }
});
