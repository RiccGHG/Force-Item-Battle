import { world, system } from "@minecraft/server";
/**
 * @typedef {Object} timer
 * @property {number} h
 * @property {number} min
 * @property {number} sec
 */
/**
 *
 * @param {timer} time
 */
export function countdown(time) {
  time.sec--;
  if (time.sec <= 0) {
    time.sec = 60;
    time.min--;
  }
  if (time.min <= 0) {
    time.min = 60;
    time.h--;
  }
}
/**
 *
 * @param {timer} time
 */
export function isOver(time) {
  if (time.h <= 0 && time.min <= 0 && time.sec <= 0) return true;
  return false;
}
