/** @format */

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
    )
    .addStringOption((option) =>
      option.setName("type").setDescription("The type of message").setRequired(true).addChoices(
        {
          name: "embed",
          value: "embed",
        },
        {
          name: "text",
          value: "text",
        }
      )
    ),

  /**
   * @param {import("discord.js").Interaction} interaction
   */
  run: async ({ interaction }) => {
    const content = interaction.options.getString("content");
    const typeChoice = interaction.options.getString("type");
    try {
      await interaction.deferReply();

      if (typeChoice === "embed") {
        const messagEmebed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setDescription(content);

        interaction.channel.send(messagEmebed);
      } else if (typeChoice === "text") {
        interaction.channel.send(content);
      }
    } catch (error) {
      console.log(`Error sending message: ${error}`);
    }
  },
  options: {
    devOnly: true,
  },
};
