/** @format */

require("dotenv/config");
const { EmbedBuilder } = require("discord.js");
const { fetch } = require("undici");

module.exports = async (interaction, client) => {
  if (!interaction.isButton()) return;

  const userId = interaction.user.id;

  try {
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

    if (interaction.customId === "approvebtn") {
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
        // Deletion successful
      } else {
        console.log("Unable to delete message, approveResponse.");
      }
    } else if (interaction.customId === "rejectbtn") {
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
        console.log('Unable to delete message, rejectResponse.')
      }
    }
  } catch (error) {
    console.log(`Error with API requests/DM creation: ${error}`);
  }
};