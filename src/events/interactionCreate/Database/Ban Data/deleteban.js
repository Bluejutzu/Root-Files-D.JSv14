/** @format */

const Bans = require("../../../../models/bans");

module.exports = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === "deleteban") {
    try {
      // Extract the ban IDs from the input
      const banIdsInput = interaction.options.getString("id");

      // Check if the user provided IDs in the correct format
      if (!banIdsInput || !/^\d+((,\d+)+)?$/.test(banIdsInput)) {
        return interaction.reply(
          "You can either provide a single ID or multiple IDs separated by a comma."
        );
      }

      // Convert the string into an array of IDs
      const banIdsArray = banIdsInput.split(",").map(Number);

      // Your existing code to process ban IDs
      const rowCount = await Bans.destroy({ where: { id: banIdsArray } });

      if (!rowCount)
        return interaction.reply("None of the provided ban IDs exist.");

      return interaction.reply("Ban(s) deleted.");
    } catch (error) {
      console.error("Error processing deleteban command:", error);
      return interaction.reply(
        "An error occurred while processing the command."
      );
    }
  }
};
