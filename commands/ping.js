const { SlashCommandBuilder } = require("discord.js");
/**
 * A basic ping command
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  execute(interaction) {
    interaction.reply("Pong!");
  },
};
