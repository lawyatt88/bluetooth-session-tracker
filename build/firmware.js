"use strict";
setTime(1751134634);
// set timezone
E.setTimeZone(-4);
let inSession = false;
// on button press, turn on light and start timer
const handleButtonPress = (data) => {
    if (inSession === true) {
        inSession = false;
        // turn off light
        digitalWrite(LED2, 0);
        // record time elapsed in minutes
        const timeElapsed = data.time - data.lastTime;
        const timeElapsedString = timeElapsed < 60
            ? `${timeElapsed} seconds`
            : `${timeElapsed / 60} minutes`;
        const sessionStartTime = new Date(data.lastTime * 1000).toString();
        const sessionEndTime = new Date(data.time * 1000).toString();
        console.log(`Session from ${sessionStartTime} to ${sessionEndTime} was ${timeElapsedString}.`);
    }
    else {
        inSession = true;
        // turn on green light
        digitalWrite(LED2, 1);
    }
};
setWatch(handleButtonPress, BTN, { repeat: true, edge: "rising", data: BTN });
