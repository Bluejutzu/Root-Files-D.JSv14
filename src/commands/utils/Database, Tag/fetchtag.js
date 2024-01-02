/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tag")
    .setDescription("Fetch a tag from the DB")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("the name of the tag")
        .setRequired(true)
    ),
  run: () => {},
  options: { devOnly: true },
};
