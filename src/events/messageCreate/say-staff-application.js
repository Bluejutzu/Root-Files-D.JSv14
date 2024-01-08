module.exports = (message, client) => {
  // Convert the message content to lowercase for case-insensitive matching
  const lowerCaseContent = message.content.toLowerCase();

  // Check if the message contains any of the specified keywords
  if (
      lowerCaseContent.includes("how can I join staff") ||
      lowerCaseContent.includes("how can I become staff")
  ) {
    message.reply({content: "You can join the staff team by meeting the requirements found [here](https://discord.com/channels/1124971431093088266/1176944619766951998/1176945293397336199)", ephemeral: true})

  }
};