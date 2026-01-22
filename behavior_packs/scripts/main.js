import { world } from "@minecraft/server";
import {test} from "./test"
world.beforeEvents.chatSend.subscribe((e) => {
  if (e.message === "Hello") return world.sendMessage("World!");
  else test(e.sender.name);
});
