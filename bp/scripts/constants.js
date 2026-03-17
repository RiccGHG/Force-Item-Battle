import { DataBase } from "./db/data_base";

export const playerData = new DataBase("playerData");
export const teams = new DataBase("teams");
export const mainData = new DataBase("settings");
export const invalidItems = [
  "minecraft:command_block",
  "minecraft:chain_command_block",
  "minecraft:repeating_command_block",
  "minecraft:command_block_minecart",
  "minecraft:deny",
  "minecraft:allow",
  "minecraft:structure_block",
  "minecraft:structure_void",
  "minecraft:light_block_0",
  "minecraft:light_block_1",
  "minecraft:light_block_2",
  "minecraft:light_block_3",
  "minecraft:light_block_4",
  "minecraft:light_block_5",
  "minecraft:light_block_6",
  "minecraft:light_block_7",
  "minecraft:light_block_8",
  "minecraft:light_block_9",
  "minecraft:light_block_10",
  "minecraft:light_block_11",
  "minecraft:light_block_12",
  "minecraft:light_block_13",
  "minecraft:light_block_14",
  "minecraft:light_block_15",
  "minecraft:jigsaw",
  "minecraft:barrier",
];

/**--Interface's-- */
/**
 * @typedef {Object} team
 * @property {{item: string, id: number, obtained: boolean, time?: string, skiped?: boolean}[]} items
 * @property {string[]} players
 * @property {number} skips
 */

/**
 * @typedef {Object} time
 * @property {number} h
 * @property {number} min
 * @property {number} s
 */