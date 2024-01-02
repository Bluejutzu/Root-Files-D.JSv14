/** @format */
const Tags = require("../../../../models/tags");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === "showtags") {
    // equivalent to: SELECT name FROM tags;
    const tagList = await Tags.findAll({ attributes: ["name"] });
    const tagString = tagList.map((t) => t.name).join(", ") || "No tags set.";

    return interaction.reply(`List of tags: ${tagString}`);
  }
};
