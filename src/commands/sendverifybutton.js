const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionsBitField, PermissionFlagsBits, Options, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require(`../../config.json`)
module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendverifybutton")
    .setDescription("Send Verify Button in desired channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),
    run: async (client, interaction) => {

      const VerifyButtonEmbed = new EmbedBuilder()
      .setDescription(`Verify by clicking the button below!`) 
      .setTitle(`${client.user.username}`)
      .setColor(config.color)
      .setFooter({text:`${client.user.username} by Quest Systems`})
      const VerifyButton = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
          .setCustomId('ButtonVerifyEntry')
          .setLabel('Verify')
          //.setEmoji('')
          .setStyle('Secondary'),
      );
      interaction.channel.send({embeds:[VerifyButtonEmbed], components:[VerifyButton]});
      interaction.reply({content:"Verify button sent!", ephemeral: true})
      
    }
 };
