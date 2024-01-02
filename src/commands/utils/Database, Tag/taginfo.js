/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("taginfo")
    .setDescription("Display info on a tag")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("the name of the tag")
        .setRequired(true)
    ),
  run: () => {},
  options: { devOnly: true },
};
