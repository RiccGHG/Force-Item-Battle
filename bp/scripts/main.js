import { system, world, ItemTypes, BlockTypes } from "@minecraft/server";
import { ActionFormData, FormCancelationReason } from "@minecraft/server-ui";
import { ChestFormData } from "./extensions/forms.js";
import { allSettings } from "./hud/settings.js";
import { mainData, teams } from "./constants.js";
import { allPlayersExist } from "./functions/team_functions.js";
import { formatIdentifier, start } from "./functions/game_functions.js";
system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    if (!mainData.get("started")) return;

  }
});
world.afterEvents.itemUse.subscribe((e) => {
  if (e.itemStack.typeId === "minecraft:compass") {
    show(e.source);
  }
  if (e.itemStack.typeId === "minecraft:clock") {
   start(e.source);
  }
});
function show(player) {
  allSettings(player);
}
