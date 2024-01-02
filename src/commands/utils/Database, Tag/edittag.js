/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("edittag")
    .setDescription("Edit a tag from the DB")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("the name of the tag | CHANGE")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("the description of the tag | CHANGE")
        .setRequired(true)
    ),
  run: () => {},
  options: { devOnly: true },
};
