import { world, system } from "@minecraft/server";

/**
 *
 * @param {import("../constants").time} time
 */
export function countdown(time) {

  if (time.s > 0) {
    time.s--;
    return;
  }
  if (time.min > 0) {
    time.min--;
    time.s = 59;
    return;
  }
  if (time.h > 0) {
    time.h--;
    time.min = 59;
    time.s = 59;
  }
}
/**
 *
 * @param {timer} time
 */
export function isOver(time) {
  if (time.h <= 0 && time.min <= 0 && time.s <= 0) return true;
  return false;
}
