/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showtags")
    .setDescription("List all tags"),
  run: () => {},
  options: { devOnly: true },
};
