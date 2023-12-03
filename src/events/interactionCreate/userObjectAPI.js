/** @format */

const { EmbedBuilder } = require('discord.js');
const { fetch } = require('undici')

module.exports = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  try {
    if (commandName === "user-object") {
      await interaction.deferReply();

      const user = interaction.options.getUser("user");
      const userId = user.id;

      const response = await fetch(
        `https://discord.com/api/v10/users/${userId}`,
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
      if (data.premium_type == 3) {
        nitroType = "Nitro Basic";
      } else if (data.premium_type == 2) {
        nitroType = "Nitro";
      } else if (data.premium_type == 1) {
        nitroType = "Nitro Classic";
      } else if (data.premium_type == 0) {
        nitroType = "No nitro on this account";
      }

      const userEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${data.username}#${data.discriminator}`)
        .addFields({
          name: "Subscription",
          value: nitroType,
          inline: false,
        })
        .setFooter({ text: data.id })
        .setTimestamp();

      interaction.editReply({ embeds: [userEmbed] });
    }
  } catch (error) {
    console.log(error);
    interaction.editReply(`No response from the API, ${error}.`);
  }
};
