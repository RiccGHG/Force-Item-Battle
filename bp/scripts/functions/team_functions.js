import { world } from "@minecraft/server";
import { playerData, mainData, teams, backpacks } from "../constants";
/**
 *
 * @returns {string}
 */
export function formatTeams() {
  let result = [];
  teams.forEach((teamId, /**@type {import("../constants").team} */ data) => {
    const formattedMembers = data.players.join(", ");
    const txt = `§l§b» §r§6${teamId}§f:§7 ${formattedMembers}`;
    result.push(txt);
  });
  result = result.join("\n");
  return result;
}
/**
 *
 * @param {number} size
 */
export function validTeamSize(size) {
  const allPlayers = world.getAllPlayers();
  if (allPlayers.length % size !== 0) return false;
  return true;
}

export function allPlayersExist() {
  let exist = true;
  /**@type {[string, import("../constants").team][]} */
  const entr = teams.entries();
  const allPlayers = world.getAllPlayers();

  for (const [teamId, data] of entr) {
    for (const player of data.players) {
      const find = allPlayers.some((p) => p.name === player);

      if (!find) {
        exist = false;
        break;
      }
    }
    if (!exist) break;
  }
  return exist;
}
/**
 *
 * @param {string} teamId
 * @param {string[]} players
 */
export function createTeam(teamId, players) {
  /**@type {import("../constants").team} */
  const fullData = {
    items: [],
    players,
    skips: mainData.get("skips") ?? 3,
  };
  teams.set(teamId, fullData);
  backpacks.set(teamId, []);
  players.forEach((p) => {
    playerData.set(p, { team: teamId });
  });
}
