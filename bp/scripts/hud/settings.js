import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { playerData, mainData, teams } from "../constants";
import { createTeam, formatTeams, validTeamSize } from "../functions/team_functions";

export function allSettings(player) {
  const ui = new ActionFormData()
    .title("Settings")
    .body("§eSelect the settings you want to go.")
    .button("Game Settings", "textures/ui/controller.png")
    .button("Team Settings", "textures/ui/flag_red")
    .show(player)
    .then((r) => {
      if (r.canceled) return;

      if (r.selection === 0) return gameSettings(player);
      return teamSettings(player);
    });
}
/**
 *
 * @param {import("@minecraft/server").Player} player
 */
function gameSettings(player) {
  /**@type {{time: import("./timer").timer, skips: number}} */
  const Default =
    mainData.size() > 0
      ? {
          time: mainData.get("time"),
          skips: mainData.get("skips"),
        }
      : {
          time: { h: 1, min: 0, s: 0 },
          skips: 3,
        };
  const { h, min, s } = Default.time;
  const ui = new ModalFormData()
    .title("Game Settings")
    .textField("Round Time", `${h}h ${min}m ${s}s`, {
      tooltip: "Format: hrs min sek",
      defaultValue: `${h}h ${min}m ${s}s`,
    })
    .textField("Skips", "3", { defaultValue: Default.skips.toString() })
    .show(player)
    .then((r) => {
      if (r.canceled) return;

      /**@type {String} */
      const roundTime = r.formValues[0];
      if (!roundTime)
        return player.sendMessage("§c§l»§r§c You need to put in a roundTime.");

      const check = /(\d+)h(rs|r)? (\d+)m(in)? (\d+)s(ec)?/.test(roundTime);

      if (!check)
        return player.sendMessage(
          "§c§l»§r§c The round time must be in this pattern: 0h 0m 0s. The zero's can be changed.",
        );

      const match = roundTime.match(/(\d+)h(rs|r)? (\d+)m(in)? (\d+)s(ec)?/);

      /**@type {import("./timer").timer} */
      let time = {
        h: parseInt(match[1]),
        min: parseInt(match[3]),
        s: parseInt(match[5]),
      };

      let skips = r.formValues[1];
      if (!skips)
        return player.sendMessage(
          "§c§l»§r§c You need to input a skips number.",
        );

      skips = parseInt(skips);
      if (isNaN(skips))
        return player.sendMessage("§c§l»§r§c The skips must be a number.");

      mainData.set("time", time);
      mainData.set("skips", skips);
      return player.sendMessage("§a§l»§r§a Settings updated.");
    });
}
/**
 *
 * @param {import("@minecraft/server").Player} player
 */
function teamSettings(player) {
  const defSize = teams.size > 0 ? teams.size : 1;
  const labelText = formatTeams();
  const ui = new ModalFormData().title("Team Settings").label(labelText);
  if (labelText.trim() !== "") {
    ui.divider();
  }
  ui.textField("Team size", "1", { defaultValue: defSize.toString() })
    .show(player)
    .then((r) => {
      if (r.canceled) return;

      const formvNum = labelText.trim() === "" ? 1 : 2;
      let teamSize = r.formValues[formvNum];
      teamSize = parseInt(teamSize);

      if (isNaN(teamSize))
        return player.sendMessage("§c§l»§r§c The team size must be a number.");

      if (!validTeamSize(teamSize))
        return player.sendMessage(
          "§c§l» §r§cThis team size cant be used, because the teams will be unfair.",
        );
      createTeamsMenu(player, teamSize);
    });
}
/**
 *
 * @param {import("@minecraft/server").Player} player
 * @param {number} teamSize
 * @param {number} runs Do not set
 * @param {number} run Do not set
 * @param {string[]} used Do not set
 * @param {[string, string[]][]} created
 */
function createTeamsMenu(
  player,
  teamSize,
  runs = world.getAllPlayers().length / teamSize,
  run = 1,
  used = [],
  created = [],
) {
  const neededPlayers = world
    .getPlayers()
    .filter((p) => !used.includes(p.name));
  const ui = new ModalFormData()
    .title(`Create teams ${run}/${runs}`)
    .label(`Team ${run}:`);
  for (let i = 0; i < teamSize; i++) {
    ui.dropdown(
      `Player §l§e${i + 1}`,
      neededPlayers.map((pl) => pl.name),
    );
  }
  ui.show(player).then((r) => {
    teams.clear();
    if (r.canceled)
      return player.sendMessage("§l§c» §r§cCancelled, => Nothing was saved.");

    const formValues = r.formValues.slice(1);

    let members = [
      ...formValues.map((f) => neededPlayers.map((p) => p.name)[f]),
    ];

    const teamId = `Team${run}`;
    created.push([teamId, members]);

    used.push(...members);
    if (run >= runs) {
      created.forEach(([teamName, players]) => {
        createTeam(teamName, players);
      })
      return player.sendMessage("§b§l» §r§aTeams created.")
    }
    createTeamsMenu(player, teamSize, runs, run + 1, used, created);
  });
}
