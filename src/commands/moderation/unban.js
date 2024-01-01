/** @format */

const { SlashCommandBuilder, bold } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user from the guild")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to unban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("the reason for the unban")
        .setRequired(false)
    ),
  run: async ({ interaction, client }) => {
    interaction.deferReply();
    const target = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";
    const boldReason = bold(reason);

    await interaction.reply(`Banned ${target.username} for ${boldReason}`);
    await interaction.guild.members.unban(target);
  },
  options: { devOnly: true },
};
