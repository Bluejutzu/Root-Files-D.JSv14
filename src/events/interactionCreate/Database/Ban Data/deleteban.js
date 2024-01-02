/** @format */
const Bans = require("../../../../models/bans");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === "deleteban") {
    const banId = interaction.options.getNumber("id");
    // equivalent to: DELETE from tags WHERE name = ?;
    const rowCount = await Bans.destroy({ where: { id: banId } });

    if (!rowCount) return interaction.reply("That ban Id doesn't exist.");

    return interaction.reply("Ban deleted.");
  }
};
