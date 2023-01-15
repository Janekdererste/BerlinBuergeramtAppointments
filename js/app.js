console.log('Notifier loaded');

// put this into the end of the event queue until all background scripts are loaded
setTimeout(() => {

        let elements = document.getElementsByClassName("buchbar");

        // there is one example element which shows the bookable color. So we need more than that one element on the page
        if (elements && elements.length && elements.length > 0) {
            console.log((elements.length - 1) + " bookable appointments");
            chrome.runtime.sendMessage('', {
                type: 'notification',
                options: {
                    title: 'An appointment',
                    message: 'There is ' + (elements.length - 1) + ' appointments',
                    iconUrl: '/icon.png',
                    type: 'basic'
                }
            });
        }
    }
    , 0);

// reload after 1min so that we don't get suspended.
setTimeout(() => window.location.reload(), 60000)
console.log("Reloading in 60s. ")