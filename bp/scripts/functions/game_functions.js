import {
  system,
  world,
  ItemTypes,
  BlockTypes,
  ItemStack,
} from "@minecraft/server";
import { playerData, mainData, teams, invalidItems } from "../constants";
import { allPlayersExist } from "./team_functions";
import { textureMap } from "../mc_texture_map";
import { ChestFormData } from "../extensions/forms";

/**@typedef {import("@minecraft/server").Player} Player*/
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
  teams.forEach((teamId, /**@type {import("../constants").team} */ data) => {
    const teamItem = getRandomItem();
    data.items = [];
    /**@type {import("../constants").team["items"][0]} */
    const itemData = {
      id: data.items.length,
      item: teamItem,
      obtained: false,
    };

    data["items"].push(itemData);
    teams.set(teamId, data);
  });

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
  str = str.replace(/ [a-z]/g, (letter) => letter.toUpperCase());
  str = str.replace(str[0], str[0].toUpperCase());
  return str.trim();
}
export function getRandomItem() {
  const allItems = ItemTypes.getAll();
  const randomItemIndex = Math.floor(Math.random() * allItems.length);
  const randomItem = allItems[randomItemIndex];
  if (invalidItems.includes(randomItem.id)) return getRandomItem();
  return randomItem.id;
}

/**
 *
 * @param {string} item
 */
export function getPath(item) {
  return (
    textureMap.get(item) ??
    (BlockTypes.get(item)
      ? `textures/blocks/${item.replace("minecraft:", "")}.`
      : `textures/items/${item.replace("minecraft:", "")}.`)
  );
}

export function end() {
  mainData.set("started", false);
  world.getAllPlayers().forEach((player) => {
    player.onScreenDisplay.updateSubtitle("hi");
    player.playSound("rare.achivement");
  });
}

/**
 *
 * @param {Player} player
 */
export function showCurrentItem(player) {
  const playerTeamId = playerData.get(player.name).team;
  /**@type {import("../constants").team} */
  const playerTeam = teams.get(playerTeamId);
  const item = playerTeam.items[playerTeam.items.length - 1];

  const ui = new ChestFormData("54")
    .title(`§l${formatIdentifier(item.item)}`)
    .pattern(
      [
        "iiiiiiiii",
        "iiiiiiiii",
        "iiiiiiiii",
        "iiiiiiiii",
        "iiiiiiiii",
        "iiiiiiiii",
      ],
      {
        i: {
          texture: item.item,
          itemName: formatIdentifier(item.item),
          itemDesc: [],
        },
      },
    )
    .show(player);
}

/**
 *
 * @param {Player} player
 */
export function skip(player) {
  const teamId = playerData.get(player.name).team;
  /**@type {import("../constants").team} */
  const team = teams.get(teamId);

  if (team.skips <= 0)
    return player.sendMessage("§l§c» §r§cYou have no skips left.");

  const currentId = team.items.length - 1;
  const { h, min, s } = mainData.get("time");
  const timeFormatted = `${h}h ${min}m ${s}s`;

  team.items[currentId]["obtained"] = true;
  team.items[currentId]["skiped"] = true;
  team.items[currentId]["time"] = timeFormatted;
  team.skips--;

  teams.set(teamId, team);
  addItem(teamId);

  const inv = player.getComponent("inventory").container;
  inv.addItem(new ItemStack(team.items[team.items.length - 2].item));

  team.players.forEach((playerName) => {
    const player = world.getAllPlayers().find((p) => p.name === playerName);
    if (!player) return;

    player.sendMessage(
      "§b§l» §r§aOne skip was used.\n§b§l» §r§eSkips left§f: §9" +
        team.skips.toString(),
    );
    player.playSound("random.orb");
  });
}

/**
 *
 * @param {Player} player
 */
export function obtained(player) {
  const teamId = playerData.get(player.name).team;
  /**@type {import("../constants").team} */
  const team = teams.get(teamId);

  const currentId = team.items.length - 1;
  const { h, min, s } = mainData.get("time");
  const timeFormatted = `${h}h ${min}m ${s}s`;

  team.items[currentId]["obtained"] = true;
  team.items[currentId]["skiped"] = false;
  team.items[currentId]["time"] = timeFormatted;
  teams.set(teamId, team);
  addItem(teamId);

  team.players.forEach((playerName) => {
    const player = world.getAllPlayers().find((p) => p.name === playerName);
    if (!player) return;

    player.playSound("random.orb");
    player.sendMessage(`§b§l»§r§7 Found item: ${formatIdentifier(team.items[team.items.length - 2]?.item)}`);
  });
}

export function addItem(teamId) {
  const team = teams.get(teamId);
  const randomItem = getRandomItem();
  /**@type {import("../constants").team["items"][number]} */
  const data = {
    id: team.items.length,
    item: randomItem,
    obtained: false,
  };
  team.items.push(data);
  teams.set(teamId, team);
}
/**
 * 
 * @param {Player} player 
 */
export function backpack(player) {
  
}