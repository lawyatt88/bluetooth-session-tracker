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

declare interface EspruinoStorage {
  write: (name: string, data: any, offset?: number) => number;
  writeJSON: (name: string, data: any) => number;
  read: (name: string, length?: number, offset?: number) => any;
  readJSON: (name: string, noExceptions: boolean) => any;
  erase: (name: string) => void;
  list: () => string[];
  open: (
    name: string,
    mode: "r" | "w" | "a"
  ) => {
    write: (name: string, data: any, offset?: number) => number;
    read: (name: string, length?: number, offset?: number) => any;
    erase: (name: string) => void;
  };
}
