/** @format */
const Bans = require("../../models/bans");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;

  const banUser = interaction.options.getUser("user");
  //const banTarget = banUser.username;
  const banReason = interaction.options.getString("reason");

  if (!banUser) return;
  try {
    // equivalent to: INSERT INTO tags (target, reason, moderator, type) values (?, ?, ?, unban/ban);
    const ban = await Bans.create({
      target: banUser.id,
      reason: banReason ?? "No reason provided",
      moderator: interaction.user.id,
      type: "unban",
    });

    return interaction.channel.send(`Ban data added.`);
  } catch (error) {
    if (error.name === "DiscordAPIError[50013]") {
      return interaction.channel.send("Missing permissions");
    }
  }
};
