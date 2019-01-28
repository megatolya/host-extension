'use strict';

function getUrlData(url) {
    const a = document.createElement('a');
    a.href = url;
    const defaultPort = {
        'http:': 80,
        'https:': 443
    }[a.protocol];
    a.str = `${a.hostname}:${a.port || defaultPort}`;
    return a;
}

chrome.webRequest.onBeforeRequest.addListener(
    function(info) {
        if (info.tabId && info.tabId > 0) {
            chrome.tabs.get(info.tabId, function (tab) {
                const tabUrlData = getUrlData(tab.url);
                const urlData = getUrlData(info.url);

                console.log(tabUrlData.str, urlData.str);
            });
        }
        return {cancel: false};
    },
    {
        urls: ['<all_urls>']
    },
    ['blocking']
);
