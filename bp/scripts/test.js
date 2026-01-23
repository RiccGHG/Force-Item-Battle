import { world } from "@minecraft/server";

export function test(name) {
world.sendMessage("Hello, " + name);
}