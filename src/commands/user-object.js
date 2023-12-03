/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user-object")
    .setDescription("Get user info")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to get a object of. IDs can be used")
        .setRequired(true)
    ),
  run: () => {},
  options: {
    devOnly: true,
  },
};
