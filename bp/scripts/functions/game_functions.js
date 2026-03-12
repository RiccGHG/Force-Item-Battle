import { system, world } from "@minecraft/server";
import { playerData, mainData, teams } from "../constants";
import { allPlayersExist } from "./team_functions";

/**
 *
 * @param {import("@minecraft/server").Player} starter
 */
export function start(starter) {
  if (teams.size <= 0)
    return starter.sendMessage("§l§c» §r§cNo teams exist. Please creat teams.");
  if (!allPlayersExist())
    return starter.sendMessage(
      "§l§c» §r§cNot all players in each teams are online. Please remake the teams.",
    );
  if (!mainData.has("skips") || !mainData.has("time"))
    return starter.sendMessage(
      "§l§c» §r§cThe settings are mising the skips or the timer. Please set the settings.",
    );
  mainData.set("started", true);
  world.getAllPlayers().forEach((p) => p.playSound("random.levelup"));
  world.sendMessage("§l§b» §r§aGame has started.");
}
/**
 *
 * @param {string} str
 */
export function formatIdentifier(str) {
  str = str.replace(/[a-z0-9]+:/, "");
  str = str.replace(/_/g, " ");
  str = str.replace(/ [a-z]/g, (letter) => letter.toUpperCase())
  str = str.replace(str[0], str[0].toUpperCase())
  return str.trim();
}