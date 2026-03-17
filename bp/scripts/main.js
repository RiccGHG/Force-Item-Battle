import { system, world, ItemTypes, BlockTypes } from "@minecraft/server";
import { ActionFormData, FormCancelationReason } from "@minecraft/server-ui";
import { ChestFormData } from "./extensions/forms.js";
import { allSettings } from "./hud/settings.js";
import { mainData, playerData, teams } from "./constants.js";
import { allPlayersExist } from "./functions/team_functions.js";
import {
  end,
  formatIdentifier,
  getPath,
  obtained,
  showCurrentItem,
  skip,
  start,
} from "./functions/game_functions.js";
import { countdown, isOver } from "./hud/timer.js";

system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    if (!mainData.get("started")) {
      player.onScreenDisplay.setActionBar("§o§b§lTimer is paused");
      return;
    }

    const playerTeamId = playerData.get(player.name).team;

    /**@type {import("./constants.js").team} */
    const playerTeam = teams.get(playerTeamId);
    const playerItem = playerTeam.items[playerTeam.items.length - 1];
    const itemTexture = getPath(playerItem.item);
    const clearName = formatIdentifier(playerItem.item);

    player.onScreenDisplay.updateSubtitle(itemTexture);
    player.onScreenDisplay.setTitle(clearName);

    /**@type {import("./constants.js").time} */
    let time = mainData.get("time");
    const str = `${time.h}h ${time.min}m ${time.s}s`;
    const design = "§b§l";
    player.onScreenDisplay.setActionBar(design + str);

    if (system.currentTick % 20 === 0) {
      countdown(time);
      mainData.set("time", time);

      if (isOver(time)) {
        end();
      }
    }
  }
});

world.afterEvents.itemUse.subscribe((e) => {
  if (e.itemStack.typeId === "minecraft:compass") {
    show(e.source);
  }
  if (e.itemStack.typeId === "minecraft:clock") {
    start(e.source);
  }
  if (e.itemStack.typeId === "minecraft:stick") {
    showCurrentItem(e.source);
  }
  if (e.itemStack.typeId === "minecraft:magma_cream") {
    skip(e.source);
  } 
});
function show(player) {
  allSettings(player);
}

world.afterEvents.playerInventoryItemChange.subscribe((e) => {
  const player = e.player;
  const item = e.itemStack;

  if (!item) return;
  const teamId = playerData.get(player.name).team;
  /**@type {import("./constants.js").team} */
  const team = teams.get(teamId);
  const teamItem = team.items[team.items.length - 1];

  if (teamItem.item !== item.typeId) return;
  obtained(player);
})