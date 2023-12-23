/** @format */

const {
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggest a change to the server"),
  run: () => {},
  options: {
    devOnly: true
  },
};
