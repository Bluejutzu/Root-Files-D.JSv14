/** @format */

require("dotenv/config");
const { Client, GatewayIntentBits, Events } = require("discord.js");
const keep_alive = require('./keep_alive.js')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`${client.user.username} is ready!`);
});

client.login(process.env.TOKEN);
