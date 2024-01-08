/** @format */

module.exports = (message, client) => {
    if (message.content === "Ping") {
      message.reply("!Pong!");
    }
  };