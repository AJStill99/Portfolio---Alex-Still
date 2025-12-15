/* BUTTONS
    Functions that will be attached to the buttons
*/

function onButtonClick() {
    addEventListener("click", handleClick);
    console.log("Button was clicked!");
}

function handleClick() {
    alert("Button Clicked! (Testing Playwright interaction...)");
    // Note this alert will also show the IP address followed by 'says' when run in chrome
    console.log("Alert displayed for button click.");
    console.log(`Button clicked at ${new Date().toLocaleTimeString()}`);
    // This should give the time the button was clicked
}

function changeBackgroundColorToggle() {
    const body = document.body;
    const currentColor = body.style.backgroundColor;
    if(currentColor === 'blue') {
        body.style.backgroundColor = 'white';
        console.log("Background color changed to white.");
    } else {
        body.style.backgroundColor = 'blue';
        console.log("Background color changed to lightblue.");
    }
}
// Simple toggle function to change background color on button click

/* INPUT FIELDS
    Functions that will be attached to input fields
*/

/* TEXT HANDLERS
    Functions that will manipulate text content
*/

