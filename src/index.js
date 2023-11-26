/** @format */

require("dotenv/config");
const { Client, GatewayIntentBits } = require("discord.js");
const { CommandKit } = require("commandkit");

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
  devGuildIds: ["1124971431093088266", "1168532822563233847"],
  devUserIds: ["953708302058012702"],
  eventsPath: `${__dirname}/events`,
  commandsPath: `${__dirname}/commands`,
});

client.login(process.env.TOKEN);
