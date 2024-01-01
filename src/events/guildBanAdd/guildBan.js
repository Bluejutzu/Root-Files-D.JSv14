/** @format */

const { GuildBan, EmbedBuilder } = require("discord.js");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;
  try {
    const target = GuildBan.user;
    const reason = GuildBan.reason ?? "No reason provided";
    const guild = GuildBan.guild;

    const banEmbed = new EmbedBuilder()
      .setColor("Red")
      .setAuthor({
        name: `Ban | ${target.username}`,
        iconURL: target.avatarURL,
      })
      .addFields(
        {
          name: "User",
          value: target,
        },
        {
          name: "Moderator",
          value: interaction.user,
        },
        {
          name: "Reason",
          value: reason,
        }
      )
      .setTimestamp()
      .setFooter({ text: `User ID: ${target.id}` });

    const banLogChannel = client.channels.cache.get("1168943639867703438");

    await banLogChannel.send({
      embeds: [banEmbed],
    });
    console.log(target, reason, guild);
  } catch (error) {
    console.log(error);
  }
};
