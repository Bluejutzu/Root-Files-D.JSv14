/** @format */

require("dotenv/config");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { CommandKit } = require("commandkit");
const mongoose = require("mongoose");

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
  devUserIds: ["953708302058012702", "778866932786659348"],
  eventsPath: `${__dirname}/events`,
  commandsPath: `${__dirname}/commands`,
  validationsPath: `${__dirname}/validations`,
  bulkRegister: true,
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
