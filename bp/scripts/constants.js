import { DataBase } from "./db/data_base";

export const playerData = new DataBase("playerData");
export const teams = new DataBase("teams");
export const settings = new DataBase("settings");

/**--Interface's-- */
/**
 * @typedef {Object} team
 * @property {string[]} items
 * @property {string[]} players
 * @property {number} skips
 */
