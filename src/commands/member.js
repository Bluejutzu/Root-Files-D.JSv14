/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whois")
    .setDescription("Get info about a member")
    .addUserOption((option) =>
      option
        .setname("user")
        .setDescription("The user to get info of")
        .setRequired(true)
    ),
    run: () => {},
    options: {
        devOnly: true,
    }
};
