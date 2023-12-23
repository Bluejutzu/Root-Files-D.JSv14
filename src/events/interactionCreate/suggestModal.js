/** @format */

const {
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder
} = require("discord.js");
require("dotenv/config");

module.exports = async (interaction, client) => {
    if (!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;
    try {
        if (commandName === 'suggest') {
            await interaction.deferReply();

            const modal = new ModalBuilder()
            .setCustomId('suggestModal')
            .setTitle('Suggestion Form');

            const suggestTitleInput = new TextInputBuilder()
            .setCustomId('suggestTitle')
            .setLabel('What are you suggesting?')
            .setStyle(TextInputStyle.Short);

            const suggestionContentInput = new TextInputBuilder()
            .setCustomId('suggestContent')
            .setLabel('Explain your suggestion')
            .setStyle(TextInputStyle.Paragraph);

            const firstModalField = new ActionRowBuilder().addComponents(suggestTitleInput);
            const secondModalField = new ActionRowBuilder().addComponents(suggestionContentInput);
            
            modal.addComponents(firstModalField, secondModalField);

            await interaction.showModal(modal)
        }
    } catch (error) {
        console.log(`Error displaying modal: ${error}`)
    }
}



