const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({intents:['Guilds', 'GuildMembers']});
const config = require("./config.js");
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

let token = config.token

client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

//command-handler
const commands = [];
readdirSync('./src/commands').forEach(async file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

console.log(`
────────────────────────────────────────────────────────────────────────────────
─██████████████████────────────────████████████───██████████████─██████──██████─
─██░░░░░░░░░░░░░░██────────────────██░░░░░░░░████─██░░░░░░░░░░██─██░░██──██░░██─
─████████████░░░░██────────────────██░░████░░░░██─██░░██████████─██░░██──██░░██─
─────────████░░████────────────────██░░██──██░░██─██░░██─────────██░░██──██░░██─
───────████░░████───██████████████─██░░██──██░░██─██░░██████████─██░░██──██░░██─
─────████░░████─────██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░██──██░░██─
───████░░████───────██████████████─██░░██──██░░██─██░░██████████─██░░██──██░░██─
─████░░████────────────────────────██░░██──██░░██─██░░██─────────██░░░░██░░░░██─
─██░░░░████████████────────────────██░░████░░░░██─██░░██████████─████░░░░░░████─
─██░░░░░░░░░░░░░░██────────────────██░░░░░░░░████─██░░░░░░░░░░██───████░░████───
─██████████████████────────────────████████████───██████████████─────██████─────
────────────────────────────────────────────────────────────────────────────────                                                                                                    
`)

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    console.log(`${client.user.username} is now online!`);
})

//event-handler
readdirSync('./src/events').forEach(async file => {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})
//

client.login(token)
