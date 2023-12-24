/** @format */

const { EmbedBuilder, inlineCode, bold } = require("discord.js");
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

      const statusPendingBold = bold("Status: Pending");
      const contentinlineCode = inlineCode(content);

      const dmPending = new EmbedBuilder()
        .setColor("Yellow")
        .setAuthor({ name: statusPendingBold })
        .setTitle("Your suggestion has been submitted")
        .setDescription(
          "The status will change as soon as the suggestion has been approved/denied by HR."
        )
        .addFields({
          name: "Your Suggestion",
          value: contentinlineCode,
        })
        .setTimestamp()
        .setFooter({ text: `${submitterUser.id} ID: ${suggestionId}` });

      await client.users.send(submitterUser.id, {
        embeds: [dmPending],
      });
    }
  } catch (error) {
    console.log(`Error receiving values from Modal: ${error}`);
  }
};
