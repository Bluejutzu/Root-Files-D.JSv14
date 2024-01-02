/** @format */
const Bans = require("../../models/bans");
const { GuildBan } = require('discord.js')

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;

  const banUser = GuildBan.user;
  //const banTarget = banUser.username;
  const banReason = GuildBan.reason;

  if (!banUser) return;
  try {
    // equivalent to: INSERT INTO tags (target, reason, moderator, type) values (?, ?, ?, unban/ban);
    const ban = await Bans.create({
      target: banUser.id,
      reason: banReason ?? "No reason provided",
      moderator: interaction.user.id,
      type: "ban",
    });

    return interaction.channel.send(`Ban data added.`);
  } catch (error) {
    console.log(error)
  }
};
