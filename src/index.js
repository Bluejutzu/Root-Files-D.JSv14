/** @format */

require("dotenv/config");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { CommandKit } = require("commandkit");
const mongoose = require("mongoose");
const { request, fetch } = require("undici");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

new CommandKit({
  client,
  devGuildIds: ["1168532822563233847"],
  devUserIds: ["953708302058012702"],
  eventsPath: `${__dirname}/events`,
  commandsPath: `${__dirname}/commands`,
  validationsPath: `${__dirname}/validations`,
  bulkRegister: true,
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  try {
    await interaction.deferReply();

    if (commandName === "user-object") {
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
      if (data.premium_type == 2) {
        nitroType = "Nitro";
      } else if (data.premium_type == 1) {
        nitroType = "Nitro Basic";
      } else if (data.premium_type == 0) {
        nitroType = "No Nitro on this account.";
      }

      const userEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${data.username}`)
        .addFields(
          {
            name: "User ID",
            value: data.id,
            inline: false,
          },
          {
            name: "Discriminator",
            value: data.discriminator,
            inline: false,
          },
          {
            name: "Nitro subscription",
            value: nitroType,
            inline: false,
          }
        )
        .setFooter({ text: "By Maryland Automatation" })
        .setTimestamp();

      interaction.editReply({ embeds: [userEmbed] });
    }
  } catch (error) {
    console.log(error);
    interaction.editReply(`No response from the API, ${error}.`);
  }
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(error);
  }
})();
