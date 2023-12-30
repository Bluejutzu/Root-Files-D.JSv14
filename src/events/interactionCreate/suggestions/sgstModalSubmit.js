/** @format */

const {
  EmbedBuilder,
  inlineCode,
  bold,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
let suggestionId = 1;

module.exports = async (interaction, client,) => {
  if (!interaction.isModalSubmit()) return;
  try {
    if (interaction.customId === "suggestModal") {
      suggestionId += 1;
      await interaction.reply({
        content: `Your submission was received successfully, ${suggestionId}`,
        ephemeral: true,
      });
      //Getting the user of the interaction
      const submitterUser = interaction.user;
      //Embed send to the alert channel
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

      //Buildin the approve and reject button
      const approvebtn = new ButtonBuilder()
        .setCustomId("approve")
        .setLabel("Approve Suggestion")
        .setStyle(ButtonStyle.Success);

      const rejectbtn = new ButtonBuilder()
        .setCustomId("reject")
        .setLabel("Reject Suggestion")
        .setStyle(ButtonStyle.Danger);

      const btnSelection = new ActionRowBuilder().addComponents(
        approvebtn,
        rejectbtn
      );

      const submissionChannel = client.channels.cache.get(
        "1168943639867703438"
      );

      await submissionChannel.send({
        embeds: [formResponseEmbed],
        components: [btnSelection],
      });
      // Formatting //
      const statusPendingBold = bold("Current Status: Pending");
      const contentinlineCode = inlineCode(content);
      // Direct Message Embed
      const dmPending = new EmbedBuilder()
        .setColor("Yellow")
        .setAuthor({ name: `From ${interaction.guild}` })
        .setTitle("Your suggestion has been submitted")
        .setDescription(
          `${statusPendingBold} \n The status will change as soon as the suggestion has been approved/denied by HR.`
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