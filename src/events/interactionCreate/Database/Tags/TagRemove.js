/** @format */
const Tags = require("../../../../models/tags");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === "deletetag") {
    const tagName = interaction.options.getString("name");
    // equivalent to: DELETE from tags WHERE name = ?;
    const rowCount = await Tags.destroy({ where: { name: tagName } });

    if (!rowCount) return interaction.reply("That tag doesn't exist.");

    return interaction.reply("Tag deleted.");
  }
};
