/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deletetag")
    .setDescription("Remove a tag from the DB")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("the name of the tag to delete")
        .setRequired(true)
    ),
  run: () => {},
  options: { devOnly: true },
};
