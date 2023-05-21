browser.runtime.sendMessage('getDetails', function (response) {
  // const div = document.getElementById('details');
  // if (response) {
  //   const cert = response.certificates[0];
  //   const ca = response.certificates[response.certificates.length - 1];
  //   div.innerText = `Subject: ${cert.subject}
  //   Issuer: ${ca.issuer}`;
  // } else {
  //   div.innerText = 'No certificate details available';
  // }
  displayCert(response);
});

function displayCert(response) {
  let queryOptions = { active: true, lastFocusedWindow: true };
  browser.tabs.query(queryOptions, ([tab]) => {
    if (browser.runtime.lastError) console.error(browser.runtime.lastError);
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    const div = document.getElementById('details');
    let securityInfo = response.get(tab.url);

    if (securityInfo !== undefined) {
      const cert = securityInfo.certificates[0];
      const ca = securityInfo.certificates[securityInfo.certificates.length - 1];
      div.innerText = `Subject: ${cert.subject}
        Issuer: ${ca.issuer}`;
    } else {
      div.innerText = 'No certificate details available';
    }
  });
}
