import { system, world } from "@minecraft/server";
import { ActionFormData, FormCancelationReason } from "@minecraft/server-ui";
import { ChestFormData } from "./extensions/forms.js";
import { allSettings } from "./hud/settings.js";
import { teams } from "./constants.js";
import { allPlayersExist } from "./functions/team_functions.js";
system.runInterval(() => {
  const ricc = world.getPlayers().find((p) => p.name === "Ricc5967");
  ricc.onScreenDisplay.updateSubtitle("textures/items/diamond");
  ricc.onScreenDisplay.setTitle("Diamond");
});
world.afterEvents.itemUse.subscribe((e) => {
  if (e.itemStack.typeId === "minecraft:compass") {
    show(e.source);
  }
  if (e.itemStack.typeId === "minecraft:stick") {
    teams.set("Team1", { players: ["Ricc5967", "Ricc5967"] });
    teams.set("Team2", { players: ["Ricc5967", "B"] });
  }
  if (e.itemStack.typeId === "minecraft:clock") {
    e.source.sendMessage(String(allPlayersExist()));
  }
});
function show(player) {
  allSettings(player);
}
