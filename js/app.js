let elemDiv = document.createElement('div');
elemDiv.style.cssText = 'position: absolute;bottom: 1rem;right: 1rem;padding:0.5rem;background-color: white;box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px;border-radius:0.2rem;font-family: Segoe UI,Tahoma,Geneva,Verdana,sans-serif;display:flex;align-items: center;gap: 0.5rem;';
let span = document.createElement('span');
span.id = 'notifiertext'
let img = document.createElement('img');
img.style.cssText = 'height: 2rem;';
img.src = "data:image/png;base64,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";
elemDiv.appendChild(img);
elemDiv.appendChild(span);

document.body.appendChild(elemDiv);


function findAppointments() {
    let elements = document.getElementsByClassName("buchbar");

    // there is one example element which shows the bookable color. So we need more than that one element on the page
    if (elements && elements.length && elements.length > 1) {

        let bookable = elements.length - 1;
        let message = bookable === 1 ? "There is 1 Appointment" : "There are " + bookable + " Appointments";

        chrome.runtime.sendMessage('', {
            type: 'notification',
            options: {
                title: 'An appointment',
                message: message,
                iconUrl: '/icon_128.png',
                type: 'basic'
            }
        });
    }
}

function countDown(seconds) {

    span.innerHTML = "Reload in: " + seconds;
    if (seconds == 0) {
        window.location.reload();
    } else {
        setTimeout(() => countDown(seconds - 1), 1000);
    }
}

// put this into the end of the event queue until all background scripts are loaded
setTimeout(findAppointments, 0);
countDown(60);