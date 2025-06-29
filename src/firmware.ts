// @ts-ignore
const storage: EspruinoStorage = require("Storage");

// SET_TIME_MARKER
// set timezone
E.setTimeZone(-4);
let inSession = false;
let lightIntervalId: number | undefined;

const getIsCaseOpen = () => {
  // Because the LED is on when the case is closed, it was reading light coming
  // from the LED. So if the light is on, we turn it off to measure, then return
  // it to its previous state
  const ledState = digitalRead(LED2);
  if (ledState === 1) digitalWrite(LED2, 0);
  const lightMeasurement = Puck.light();
  digitalWrite(LED2, ledState);
  return lightMeasurement > 0.08;
};

// To preserve battery, only show light when the case is open
const handleLight = () => {
  // Check every second
  let timeout = 1000;
  lightIntervalId = setInterval(() => {
    // Check if case is open
    const isCaseOpen = getIsCaseOpen();
    // If open, turn the light on, if closed, turn it off
    if (isCaseOpen) {
      digitalWrite(LED2, 1);
    } else {
      digitalWrite(LED2, 0);
    }
  }, timeout);
};

// on button press, turn on light and start timer
const handleButtonPress = (data: WatchData) => {
  if (inSession === true) {
    inSession = false;
    // turn off light & stop light timeout
    digitalWrite(LED2, 0);
    if (lightIntervalId) clearInterval(lightIntervalId);
    // record time elapsed in minutes
    const timeElapsed = data.time - data.lastTime;
    const timeElapsedString =
      timeElapsed < 60
        ? `${timeElapsed} seconds`
        : `${timeElapsed / 60} minutes`;
    const sessionStartTime = new Date(data.lastTime * 1000).toString();
    const sessionEndTime = new Date(data.time * 1000).toString();

    const sessionData = storage.readJSON("sessionData", true) || [];
    // add the latest session to array
    sessionData.push({
      timeElapsed,
      sessionStartTime,
      sessionEndTime,
    });
    console.log({ sessionData });
    storage.writeJSON(`sessionData`, sessionData);
    console.log(
      `Session from ${sessionStartTime} to ${sessionEndTime} was ${timeElapsedString}.`
    );
  } else {
    inSession = true;
    handleLight();
  }
};

setWatch(handleButtonPress, BTN, { repeat: true, edge: "rising", data: BTN });
