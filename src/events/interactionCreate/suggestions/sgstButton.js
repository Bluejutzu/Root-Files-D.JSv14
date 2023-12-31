/** @format */

require("dotenv/config");
const { EmbedBuilder } = require("discord.js");
const { fetch } = require("undici");

module.exports = async (interaction, client) => {
  if (!interaction.isButton()) return;
  //Getting variables for Embeds
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

  const data = await response.json();
  const lastMessageId = data.last_message_id;
  const channelId = data.id;

  try {
    if (interaction.customId === "approve") {
      //Deleting Direct Message
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
        //Building Approve Embed
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
        //Using API to edit initial embed with Approve Embed
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
        //Using API data and converting to JSON and logging the data
        const aeditAPIData = await editEmbed.JSON();
        console.log(aeditAPIData);
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
        console.log(
          `Deleted message: https://discord.com/channels/@me/${channelId}/${lastMessageId}`
        );
        //Building Reject Embed
        const rejectEmbed = new EmbedBuilder()
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
        //Using API to edit initial embed with Approve Embed
        const editEmbed = await fetch(
          `https://discord.com/api/v10/channels/${channelId}/messages/${lastMessageId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bot ${process.env.TOKEN}`,
              "Content-Type": "application/json",
            },
            body: {
              embeds: [rejectEmbed],
            },
          }
        );
        //Using API data and converting to JSON and logging the data
        const reditAPIData = await editEmbed.JSON();
        console.log(reditAPIData);
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
