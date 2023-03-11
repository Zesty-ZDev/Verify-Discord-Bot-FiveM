const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  PermissionsBitField,
  PermissionFlagsBits
} = require("discord.js");
const {
  SlashCommandBuilder
} = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Credits for the developers on the Bot"),
  run: async (client, interaction) => {


    const help = new EmbedBuilder()
      .setAuthor({name: `${client.user.username} | Z-Dev `, iconURL: 'https://cdn.discordapp.com/attachments/712226602674552852/1084004801500688394/Z-Dev-Logo.gif'})
      .setDescription(` ${client.user.username} Is an open source multiguild global banning system bot developed by Z-Dev \n\nClick the button below to join the Z-Dev discord featuring exclusive bot releases\n\n *Or click [here](https://github.com/Zesty-ZDev) to view the repository*`)
      .setColor(0x65a4d8)
      .setImage('https://cdn.discordapp.com/attachments/712226602674552852/1083997852142936115/Z-Dev-Banner-opt.gif')
      .setFooter({
        text: 'Developed by Z-Dev',
        iconURL: 'https://cdn.discordapp.com/attachments/712226602674552852/1084004801500688394/Z-Dev-Logo.gif'
      });
    const button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        //.setCustomId('')
        .setLabel('Z-Dev Discord')
        .setEmoji('1083979315328335944')
        .setURL('https://discord.gg/aECYfwUq9P')
        .setStyle('Link'),
      );
    //Do not remove credits!
    interaction.reply({embeds: [help], components: [button], ephemeral: true})
  }
};