/** @format */
const Bans = require("../../../../models/bans");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName == "baninfo") {
    const query = interaction.options.getUser("userid")
    const queryTarget = query.id;

    // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
    const data = await Bans.findOne({ where: { target: queryTarget } });

    if (data) {
      return interaction.reply(
        `<@!${queryTarget}> was banned for **${data.reason}** by ${data.moderator}`
      );
    }

    return interaction.reply(`Could not find User: ${queryTarget}`);
  }
};
