/// <reference types="espruino" />

declare const BTN: Pin;
declare const LED1: Pin;
declare const LED2: Pin;
declare const LED3: Pin;

declare interface WatchData {
  // whether the pin is currently a 1 or a 0
  state: boolean;
  // the time in seconds at which the pin changed state
  time: number;
  // the time in seconds at which the pin last changed state. When using edge:'rising' or edge:'falling', this is not the same as when the function was last called.
  lastTime: number;
}
