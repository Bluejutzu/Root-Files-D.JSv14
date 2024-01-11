/** @format */

module.exports = (message, client) => {
  // Convert the message content to lowercase for case-insensitive matching
  const lowerCaseContent = message.content.toLowerCase();
  const blChannelIds = [
    1172619345663381545, 1172813679394304072, 1172615606621716543,
    1172895426131808276, 1173266285518397550, 1176944641795424307,
  ];

  // Check if the Id of the channel the message was sent in equals to blChannelIds
  if (blChannelIds.includes(blChannelIds)) return;

  // Check if the message content includes one of the querys
  if (
    lowerCaseContent.includes("how can I join staff") ||
    lowerCaseContent.includes("how can I become staff")
  ) {
    // Check if the message contains any of the specified keywords
    message.reply({
      content:
        "You can join the staff team by meeting the requirements found [here](https://discord.com/channels/1124971431093088266/1176944619766951998/1176945293397336199)",
      ephemeral: true,
    });
  } else return;
};
