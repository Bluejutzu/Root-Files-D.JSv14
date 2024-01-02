/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addtag")
    .setDescription("Add a tag to the DB")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("the name of the tag")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("the description of the tag")
        .setRequired(true)
    ),
  run: () => {},
  options: { devOnly: true },
};
