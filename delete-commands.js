const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
require("dotenv").config();

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// Deletes all commands
rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);
