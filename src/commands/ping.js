/** @format */

const { SlashCommandBuilder } = require("discord.js/typings");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  run: () => {},
  options: {},
};
