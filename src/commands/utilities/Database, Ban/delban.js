/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deleteban")
    .setDescription("Delete info on one or more bans from the DB")
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("The id(s) of the ban(s) separated by a comma")
        .setRequired(true)
    ),
  run: () => {},
  options: { devOnly: true },
};
