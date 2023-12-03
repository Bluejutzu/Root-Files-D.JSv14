/** @format */

const { SlashCommandBuilder, inlineCode } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Broadcast a message")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("The message you would like to send")
        .setRequired(true)
        .setMaxLength(2000)
        .setMinLength(1)
    ),
  run: async ({ interaction }) => {
    const content = interaction.options.getString("content");
    const formatted = inlineCode(content);
    try {
      interaction.reply({ content: `Send ${formatted}`, ephemeral: true });

      interaction.channel.send(content);
      
    } catch (error) {
      console.log(`Error sending message: ${error}`);
    }
  },
  options: {
    devOnly: true,
  },
};
