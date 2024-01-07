/** @format */
const { EmbedBuilder, Message } = require("discord.js");
const blChannelId = [1183817237711306864, 1192493088887816262];
const excludedAuthorIds = [1173035527327461486, 1168533782790410261];

module.exports = async (message, oldMessage, newMessage) => {
  const channelId = message.channelId;

  if (
    blChannelId.includes(channelId) ||
    excludedAuthorIds.includes(message.author.id)
  )
    return;

  try {
    const logEmbed = new EmbedBuilder()
      .setColor("Blurple")
      .setDescription(
        `Message from ${message.author} edited in ${message.channel}. \n [Jump to Message!](https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id})`
      )
      .addFields(
        {
          name: "Before",
          value: oldMessage,
        },
        {
          name: "After",
          value: newMessage,
        }
      )
      .setTimestamp()
      .setFooter({ text: `User ID: ${message.author.id}` });

    const logChannelId = client.channels.cache.get("1168943639867703438");

    await logChannelId.send({
      embeds: [logEmbed],
    });
  } catch (error) {
    console.log(error);
  }
};
