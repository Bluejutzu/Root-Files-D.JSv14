/** @format */

const {
  SlashCommandBuilder,
  bold,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the guild")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("the reason for the ban")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionsBitField.BanMembers),
  run: async ({ interaction, client }) => {
    await interaction.deferReply();

    const target = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";
    const boldReason = bold(reason);

    await interaction.followUp(`Banned ${target.username} for ${boldReason}`);
    await interaction.guild.members.ban(target);
  },
  options: { devOnly: true },
};
