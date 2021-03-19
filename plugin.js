chrome.webRequest.onBeforeRequest.addListener(
  function(smiles) {
    if (smiles.url.match(/redirect = true/)) {
      return;
    }

    const url = new URL(smiles.url);
    const cleanHost = url.hostname.replace(/^www\./, "");

    const amazonUrls = ["amazon.com", "amazon.de", "amazon.co.uk"];

    if (amazonUrls.includes(cleanHost)) {
      return {
        redirectUrl: `${url.protocol}//smile.${cleanHost}${url.pathname}`,
      };
    }
  },
  {
    urls: [
      "*://www.amazon.com/*",
      "*://www.amazon.co.uk/*",
      "*://www.amazon.de/*",
    ],
  },
  ["blocking"]
);