/** @format */

require("dotenv/config");
const { Client, GatewayIntentBits, Events } = require("discord.js");
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
  devGuildIds: ["1168532822563233847"],
  devUserIds: ["953708302058012702", "778866932786659348"],
  eventsPath: `${__dirname}/events`,
  commandsPath: `${__dirname}/commands`,
  validationsPath: `${__dirname}/validations`,
  bulkRegister: true,
});
client.once(Events.ClientReady, (readyClient) => {
  console.log(`${client.user.username} is ready!`);
});

client.login(process.env.TOKEN);