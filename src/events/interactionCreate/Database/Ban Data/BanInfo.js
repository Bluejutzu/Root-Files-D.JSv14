/** @format */
const Bans = require("../../../../models/bans");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName == "baninfo") {
    const query = interaction.options.getUser("userid")
    const queryTarget = query.id;

    // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
    const bans = await Bans.findOne({ where: { target: queryTarget } });

    if (bans) {
      return interaction.reply(
        `<@!${queryTarget}> was banned for **${bans.reason}** by <@!${bans.moderator}>`
      );
    }

    return interaction.reply(`Could not find User: ${queryTarget}`);
  }
};
