/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("baninfo")
    .setDescription("Display info on a Ban")
    .addUserOption((option) =>
      option
        .setName("userid")
        .setDescription("the query")
        .setRequired(true)
    ),
  run: () => {},
  options: { devOnly: true },
};
