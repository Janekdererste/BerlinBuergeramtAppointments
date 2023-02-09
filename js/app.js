const countDownID = "countDown"

let elemDiv = document.createElement('div');
elemDiv.innerHTML = `
    <div style="width: 1.5rem;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"/></svg>
    </div>
    <span id="${countDownID}">Some Text</span>
`
elemDiv.style.cssText = 'position: absolute;bottom: 1rem;right: 1rem;padding:0.5rem;background-color: white;box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px;border-radius:0.2rem;font-family: Segoe UI,Tahoma,Geneva,Verdana,sans-serif;display:flex;align-items: center;gap: 0.5rem;';
document.body.appendChild(elemDiv);

async function findAppointments() {
    let elements = document.getElementsByClassName("buchbar");

    // there is one example element which shows the bookable color. So we need more than that one element on the page
    if (elements && elements.length && elements.length > 1) {
        let bookable = elements.length - 1;

        await chrome.runtime.sendMessage(
            {
                type: 'notification',
                options: {
                    title: notificationTitle(),
                    message: notificationMessage(bookable),
                    iconUrl: '/icon_128.png',
                    type: 'basic'
                }
            })
    }
}

function countDown(seconds) {

    const countDownElement = document.getElementById(countDownID)
    countDownElement.innerHTML = countDownText(seconds)

    if (seconds == 0) {
        window.location.reload();
    } else {
        setTimeout(() => countDown(seconds - 1), 1000);
    }
}

// put this into the end of the event queue until all background scripts are loaded
setTimeout(findAppointments, 0);
countDown(60);

function notificationTitle() {
    if (isGerman()) {
        return "Bürgeramtstermin"
    } else {
        return "Bürgeramt Appointment"
    }
}

function notificationMessage(numAppts) {
    if (numAppts === 1) return notificationMessageSingle()
    return notificationMessageMultiple(numAppts)
}

function notificationMessageSingle() {
    if (isGerman()) {
        return "Es gibt einen Termin!"
    } else {
        return "There is one Appointment!"
    }
}

function notificationMessageMultiple(numAppts) {
    if (isGerman()) {
        return `Es gibt ${numAppts} Termine!`
    } else {
        return `There are ${numAppts} Appointments!`
    }
}

function countDownText(seconds) {
    if (isGerman()) {
        return `Neu laden in ${seconds}`
    } else {
        return `Reload in ${seconds}`
    }
}

function isGerman() {
    return navigator.language.startsWith("de")
}