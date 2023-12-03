/** @format */

const { EmbedBuilder, CommandInteraction } = require("discord.js");
require("dotenv/config");
const { fetch } = require("undici");

module.exports = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  try {
    if (commandName === "whois") {
      await interaction.deferReply();

      const user = interaction.options.getUser("user");
      const userId = user.id;

      const response = await fetch(
        `https://discord.com/api/v10/guilds/1168532822563233847/members/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bot ${process.env.TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      let nitroType;
      if (data.user.premium_type == 3) {
        nitroType = "Nitro Basic";
      } else if (data.user.premium_type == 2) {
        nitroType = "Nitro";
      } else if (data.user.premium_type == 1) {
        nitroType = "Nitro Classic";
      } else if (data.user.premium_type == 0) {
        nitroType = "No nitro on this account";
      }

      const memberEmbed = new EmbedBuilder()
    }
  } catch (error) {
    console.log(error);
  }
};
