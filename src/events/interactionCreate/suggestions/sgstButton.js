/** @format */

require("dotenv/config");
const { EmbedBuilder } = require("discord.js");
const { fetch } = require("undici");
const { content, submitterUser, suggestionId } = require('./sgstModalSubmit')

module.exports = async (interaction, client) => {
  if (!interaction.isButton()) return;

  const userId = interaction.user.id;
  const response = await fetch(
    `https://discord.com/api/v10/users/@me/channels`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient_id: userId,
      }),
    }
  );
  console.log(suggestionId, submitterUser, content);

  const data = await response.json();
  const lastMessageId = data.last_message_id;
  const channelId = data.id;

  try {
    if (interaction.customId === "approve") {
      const approveResponse = await fetch(
        `https://discord.com/api/v10/channels/${channelId}/messages/${lastMessageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bot ${process.env.TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (approveResponse.status === 204) {
        console.log(
          `Deleted message: https://discord.com/channels/@me/${channelId}/${lastMessageId}`
        );

        const approveEmbed = new EmbedBuilder()
          .setColor("Green")
          .setAuthor({ name: "Suggestion Management" })
          .setTitle("Suggestion Approved")
          .setDescription(
            `From ${submitterUser}. Approved by ${interaction.user}`
          )
          .addFields({
            name: "Suggestion",
            value: content,
          })
          .setFooter({
            text: `${submitterUser.id} ID: ${suggestionId}`,
          })
          .setTimestamp();

        const editEmbed = await fetch(
          `https://discord.com/api/v10/channels/${channelId}/messages/${lastMessageId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bot ${process.env.TOKEN}`,
              "Content-Type": "application/json",
            },
            body: {
              embeds: [approveEmbed],
            },
          }
        );

        const editAPIData = await editEmbed.JSON();
      } else {
        console.log(
          `Error within the API Request: ${approveResponse.status}, ${approveResponse.statusText}`
        );
      }
    } else if (interaction.customId === "reject") {
      const rejectResponse = await fetch(
        `https://discord.com/api/v10/channels/${channelId}/messages/${lastMessageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bot ${process.env.TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (rejectResponse.status === 204) {
        // Deletion successful
      } else {
        console.log(
          `Error within the API Request: ${rejectResponse.status}, ${rejectResponse.statusText}`
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};
