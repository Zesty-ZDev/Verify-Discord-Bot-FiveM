const { EmbedBuilder, InteractionType, ButtonBuilder, TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const config = require(`../../config.json`)
module.exports = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        let client = interaction.client;
//Nickname Modal Submit
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'VerifyModal') {
            let CharacterNameValue = interaction.fields.getTextInputValue('CharacterNameTextInput')
            let SteamNameValue = interaction.fields.getTextInputValue('SteamNameTextInput')

            let NickNameString = `${CharacterNameValue} [${SteamNameValue}]`

      const VerifyEmbed = new EmbedBuilder()
      .setDescription(`Your server profile is now set to: \n${NickNameString} \n\n *You will be verified once a staff membed accepts the request!*`) 
      .setTitle(`${client.user.username} | Quest Systems`)
      .setColor(config.color)
      .setFooter({text:`${client.user.username} by Quest Systems`})

      const VerifyRequest = new EmbedBuilder()
      .setDescription(`<@${interaction.user.id}> has requested verification and has set their name to: \n\`${NickNameString}\` \n\n *Click the "Verify" Button below to verify the user or click "Deny" to notify the user something is wrong * `) 
      .setTitle(`${client.user.username}`)
      .setColor(config.color)
      .setFooter({text:`${client.user.username} by Quest Systems`})
      const StaffVerifyButton = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
          .setCustomId(`ButtonVerifyEntryStaff-${interaction.user.id}`)
          .setLabel(`Verify ${interaction.user.username}`)
          //.setEmoji('')
          .setStyle('Success'),
          new ButtonBuilder()
          .setCustomId(`ButtonDenyEntryStaff-${interaction.user.id}`)
          .setLabel(`Deny ${interaction.user.username}`)
          //.setEmoji('')
          .setStyle('Danger'),
      )

              if (NickNameString.length > 32 ){
                interaction.reply({content: `The Name: ${NickNameString} exceeded the maximum length of 29 characters set by discord!`, ephemeral: true})
              }
else{
    if (interaction.guild.ownerId == interaction.user.id) {
        interaction.reply({content: `Owner cannot use this function!`, ephemeral: true})
    }
    else{
    const channel = await client.channels.fetch(config.staffchannel);
    interaction.reply({embeds: [VerifyEmbed], ephemeral: true})
    channel.send({embeds:[VerifyRequest], components:[StaffVerifyButton]})  
    let user = interaction.guild.members.cache.get(interaction.user.id);
    user.setNickname(NickNameString)}
}

       //Deny Reason Modal Submit
       if (!interaction.isModalSubmit()) return;
       if (interaction.customId === 'DenyStaffModal') {
           let reasondeny = interaction.fields.getTextInputValue('DenialReasonTextInput')
                           const DenyNotifyEmbed = new EmbedBuilder()
                           .setDescription(`<@${userIDGLOBAL}> you were denied from the verification for the reason below:\n ${reasondeny}`) 
                           .setTitle(`${client.user.username}`)
                           .setColor(config.color)
                           .setFooter({text:`${client.user.username} by Quest Systems`})

                           const DenyUpdateStaffEmbed = new EmbedBuilder()
                           .setDescription(`<@${userIDGLOBAL}> was denied from the verification for the reason below:\n ${reasondeny}`) 
                           .setTitle(`${client.user.username}`)
                           .setColor(config.color)
                           .setFooter({text:`${client.user.username} by Quest Systems`})
                           const DenyUpdateButton = new ActionRowBuilder()
                           .addComponents(
                               new ButtonBuilder()
                               .setLabel('Quest Systems Discord')
                               //.setEmoji('')
                               .setURL('https://discord.gg/9T7p9HjTQt')
                               .setStyle('Link'),
                           );
                           client.users.send(userIDGLOBAL,{embeds:[DenyNotifyEmbed]})
                           interaction.update({embeds:[DenyUpdateStaffEmbed], components:[DenyUpdateButton], ephemeral: true})
       } 

        }
    }
}