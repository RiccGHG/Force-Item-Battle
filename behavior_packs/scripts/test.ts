import { world } from "@minecraft/server";

export function test(name: String): void {
world.sendMessage("Hello, " + name);
}