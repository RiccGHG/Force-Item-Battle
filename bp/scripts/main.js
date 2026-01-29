import { system, world } from "@minecraft/server";
import { ActionFormData, FormCancelationReason } from "@minecraft/server-ui";
import { ChestFormData } from "./extensions/forms.js";
system.runInterval(() => {
  const ricc = world.getPlayers().find(p => p.name === "Ricc5967");
  ricc.onScreenDisplay.updateSubtitle("textures/items/diamond");
  ricc.onScreenDisplay.setTitle("Diamond")
})
world.afterEvents.itemUse.subscribe((e) => {
  if (e.itemStack.typeId === "minecraft:compass") {
    show(e.source);
  }
});
function show(player) {
  const ui = new ChestFormData(54)
    .title("Main")
    .button(0, "Hi", [], "minecraft:stone")
    .show(player)
    .then((r) => {
      if (r.cancelationReason === FormCancelationReason.UserBusy)
        return show(player);
    });
}
