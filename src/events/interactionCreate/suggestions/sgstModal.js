/** @format */

const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  try {
    if (commandName === "suggest") {

      const modal = new ModalBuilder()
        .setCustomId("suggestModal")
        .setTitle("Suggestion Form");

      const suggestionContentInput = new TextInputBuilder()
        .setCustomId("suggestContent")
        .setLabel("Explain your suggestion")
        .setStyle(TextInputStyle.Paragraph);

      const firstModalField = new ActionRowBuilder().addComponents(
        suggestionContentInput
      );

      modal.addComponents(firstModalField);

      await interaction.showModal(modal);
    }
  } catch (error) {
    console.log(`Error displaying modal: ${error}`);
  }
};
