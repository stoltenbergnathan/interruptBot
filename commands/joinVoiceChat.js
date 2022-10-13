const { SlashCommandBuilder, channelMention } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioResource,
  createAudioPlayer,
  AudioPlayerStatus,
  getVoiceConnection,
} = require("@discordjs/voice");
const { join } = require("node:path");
/**
 * Will cause the bot to join same voice channel of the
 * user who called the command
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Joins bot to room"),
  execute(interaction) {
    if (interaction.member.voice.channel !== null) {
      let connection = getVoiceConnection(interaction.guild.id);
      if (!connection) {
        connection = joinVoiceChannel({
          channelId: interaction.member.voice.channel.id,
          guildId: interaction.guild.id,
          adapterCreator: interaction.guild.voiceAdapterCreator,
          selfDeaf: false,
          selfMute: false,
        });
        interaction.reply(`Joining ${interaction.member.voice.channel}`);
      } else {
        if (
          connection.joinConfig.channelId !==
          interaction.member.voice.channel.id
        ) {
          interaction.reply({
            content:
              `Looks like I am already in ${channelMention(
                connection.joinConfig.channelId
              )}. ` + "As of now I can only be in one voice channel at a time",
            ephemeral: true,
          });
          return;
        }
      }
      const player = createAudioPlayer();
      let audio = createAudioResource(
        join(__dirname, "audio", process.env.MP3_FILE)
      );
      connection.subscribe(player);
      const userId = interaction.member.user.id;

      connection.receiver.speaking.on("start", (user) => {
        console.log(`${user} started`);
        console.log(player.state.status);
        if (user !== userId) {
          if (player.state.status == AudioPlayerStatus.Paused)
            player.unpause(audio);
          else player.play(audio);
        }
      });

      connection.receiver.speaking.on("end", (user) => {
        if (user !== userId) {
          console.log(`${user} stopped`);
          player.pause(audio);
        }
      });

      player.on(AudioPlayerStatus.Idle, () => {
        console.log("STOPPED");
        audio = createAudioResource(
          join(__dirname, "audio", process.env.MP3_FILE)
        );
        player.play(audio);
      });
    } else
      interaction.reply({
        content: "Please join a voice channel before calling the join command",
        ephemeral: true,
      });
  },
};
