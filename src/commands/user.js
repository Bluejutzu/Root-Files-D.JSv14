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
    ),
  run: async ({ interaction, handler }) => {
    const user = interaction.options.getUser("user");
    const userId = user?.id

    interaction.deferReply();
    await handler.reloadCommands();

    await fetch("https://discord.com/api/users/" + userId)
      .then((response) => response.json())
      .then((json) => console.log(json));

    interaction.followUp(json);
  },
  options: {
    devOnly: true,
  },
};
