import { world, system } from "@minecraft/server";
/**
 * @typedef {Object} timer
 * @property {number} h
 * @property {number} min
 * @property {number} sec
 */
/**@type {timer} */
const timeObj = {
  h: 0,
  min: 0,
  sec: 0,
};
/**
 *
 * @param {timer} time
 */
export function countdown(time) {
  if (time.sec <= 0) {
    time.sec = 60;
    time.min--;
  }
  if (time.min <= 0) {
    time.min = 60;
    time.h--;
    return;
  };
  time.sec--;
}
