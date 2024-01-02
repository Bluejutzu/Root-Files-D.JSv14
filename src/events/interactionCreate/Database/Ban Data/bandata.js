/** @format */
const Bans = require("../../../../models/bans");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === "ban" || "unban") {
    const banUser = interaction.options.getUser("user");
    //const banTarget = banUser.username;
    const banReason = interaction.options.getString("reason");

    try {
      // equivalent to: INSERT INTO tags (target, reason, moderator, type) values (?, ?, ?, unban/ban);
      const ban = await Bans.create({
        target: banUser.id,
        reason: banReason ?? 'No reason provided',
        moderator: interaction.user.id,
        type: commandName,
      });

      return interaction.channel.send(`Ban data added.`);
    } catch (error) {
      console.log(error)
      return interaction.channel.send(`Unable to add ban data ${error}`);
    }
  } else return;
};
