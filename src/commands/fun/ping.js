/** @format */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!!!!"),
  run: async ({ interaction, handler }) => {
    interaction.deferReply();

    await handler.reloadCommands();

    interaction.followUp("Reloaded");
  },
  options: {},
};
