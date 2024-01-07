/** @format */

require("dotenv/config");
const { Client, GatewayIntentBits, Events } = require("discord.js");
const { CommandKit } = require("commandkit");
const Bans = require("./models/bans.js");

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
  devGuildIds: ["1168532822563233847", "1124971431093088266"],
  devUserIds: ["368709086008573952", "953708302058012702"],
  eventsPath: `${__dirname}/events`,
  commandsPath: `${__dirname}/commands`,
  validationsPath: `${__dirname}/validations`,
  bulkRegister: true,
});
client.once(Events.ClientReady, (readyClient) => {
  Bans.sync();
  console.log(`${client.user.username} is ready!`);
});

client.login(process.env.TOKEN);
