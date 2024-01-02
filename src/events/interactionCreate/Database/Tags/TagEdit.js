/** @format */
const Tags = require("../../../../models/tags");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === "edittag") {
    const tagName = interaction.options.getString("name");
    const tagDescription = interaction.options.getString("description");

    // equivalent to: UPDATE tags (description) values (?) WHERE name='?';
    const affectedRows = await Tags.update(
      { description: tagDescription },
      { where: { name: tagName } }
    );

    if (affectedRows > 0) {
      return interaction.reply(`Tag ${tagName} was edited.`);
    }

    return interaction.reply(`Could not find a tag with name ${tagName}.`);
  }
};
