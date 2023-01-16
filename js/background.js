
console.log("load background");
chrome.runtime.onMessage.addListener(data => {
    console.log("received message")
    if (data.type === 'notification') {
        chrome.notifications.create('', data.options);
    }
});