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
    console.log(data.last_message_id);

    if (interaction.customId == "approvebtn") {
      const approveResponse = await fetch(
        `https://discord.com/api/v10/channels/data.id/messages/data.last_message_id`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bot ${process.env.TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await approveResponse.json();
    } else if (interaction.customId == "rejectbtn") {
    }
  } catch (error) {
    console.log(`Error with API requests/DM creation: ${error}`);
  }
};
