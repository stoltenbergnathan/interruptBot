const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
/**
 * When called causes bot to leave channel it is currently in
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Removes bot to room"),
  execute(interaction) {
    if (interaction.member.voice.channel !== null) {
      let connection = getVoiceConnection(interaction.guild.id);
      if (connection !== undefined) {
        interaction.reply(`Leaving ${interaction.member.voice.channel}`);
        connection.disconnect();
        connection.destroy();
      } else
        interaction.reply({
          content: "Bot is not in your voice channel ",
          ephemeral: true,
        });
    }
  },
};
