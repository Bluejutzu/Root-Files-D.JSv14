/** @format */

const { EmbedBuilder } = require("discord.js");
let suggestionId = 1;

module.exports = async (interaction, client) => {
  if (!interaction.isModalSubmit()) return;
  try {
    if (interaction.customId === "suggestModal") {
      suggestionId += 1;
      await interaction.reply({
        content: `Your submission was received successfully, ${suggestionId}`,
        ephemeral: true,
      });

      const submitterUser = interaction.user;

      const content = interaction.fields.getTextInputValue("suggestContent");
      const formResponseEmbed = new EmbedBuilder()
        .setColor("Blurple")
        .setTitle("New Suggestion Submission")
        .setDescription(`From ${submitterUser}`)
        .addFields({
          name: "Suggestion",
          value: content,
        })
        .setTimestamp()
        .setFooter({ text: `${submitterUser.id} ID: ${suggestionId}` });

      const submissionChannel = client.channels.cache.get(
        "1168943639867703438"
      );
      await submissionChannel.send({ embeds: [formResponseEmbed] });
    }
  } catch (error) {
    console.log(`Error receiving values from Modal: ${error}`);
  }
};
