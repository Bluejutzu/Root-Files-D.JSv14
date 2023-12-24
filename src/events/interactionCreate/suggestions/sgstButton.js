/** @format */

const { fetch } = require("undici");
require("dotenv/config");
const { EmbedBuilder } = require("discord.js");

module.exports = async (interaction, client) => {
  if (!interaction.isButton()) return;

  let targetUser = interaction.user.id
  const userId = targetUser.toString()

  try {
    const response = await fetch(
      `https://discord.com/api/v10/users/@me/channels`,
      {
        method: "POST",
        params: {
          recipient_id: userId,
        },
        headers: {
          Authorization: `Bot ${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data, userId);

    if (interaction.customId == "approvebtn") {
    } else if (interaction.customId == "rejectbtn") {
    }
  } catch (error) {
    console.log(`Error with API requests/DM creation: ${error}`);
  }
};
