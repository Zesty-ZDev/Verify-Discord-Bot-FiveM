const { EmbedBuilder, InteractionType, ButtonBuilder, TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const config = require(`../../config.js`)
module.exports = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        let client = interaction.client;
//Nickname Modal Submit
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'VerifyModal') {
            let CharacterNameValuePRECAP = interaction.fields.getTextInputValue('CharacterNameTextInput')

            const CharNameARRAY = CharacterNameValuePRECAP.split(' ')
            for (var i = 0; i < CharNameARRAY.length; i++) {
                CharNameARRAY[i] = CharNameARRAY[i].charAt(0).toUpperCase() + CharNameARRAY[i].slice(1);
            
            }
            let CharacterNameValue = CharNameARRAY.join(' ');

            let SteamNameValue = interaction.fields.getTextInputValue('SteamNameTextInput')

            let NickNameString = `${CharacterNameValue} [${SteamNameValue}]`

      const VerifyEmbed = new EmbedBuilder()
      .setDescription(`Your server profile is now set to: \n${NickNameString} \n\n *You will be verified once a staff member accepts the request!*`) 
      .setTitle(`${client.user.username} | Z-Dev`)
      .setColor(config.color)
      .setFooter({text:`${client.user.username} by Z-Dev`})



      const VerifyRequest = new EmbedBuilder()
      .setDescription(`<@${interaction.user.id}> has requested verification and has set their name to: \n\`${NickNameString}\` \n\nAccount created - <t:${Math.floor(interaction.user.createdTimestamp / 1000)}> \n\n *Click the "Verify" Button below to verify the user or click "Deny" to notify the user something is wrong* `) 
      .setTitle(`${client.user.username}`)
      .setColor(config.color)
      .setFooter({text:`${client.user.username} by Z-Dev`})
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

        if(config.autoverify == true){

            interaction.reply({content:'You have been verified', ephemeral:true})
      let user = interaction.guild.members.cache.get(interaction.user.id);
      user.setNickname(NickNameString)


        //Checks if roletoadd is empty
        if (!config.roletoadd == ``){
        interaction.member.roles.add(config.roletoadd)}

        //Checks if roletoremove is empty
        if (!config.roletoremove == ``){
        interaction.member.roles.remove(config.roletoremove)}

        }else{

    const channel = await client.channels.fetch(config.staffchannel);
    interaction.reply({embeds: [VerifyEmbed], ephemeral: true})
    channel.send({embeds:[VerifyRequest], components:[StaffVerifyButton]})  
    let user = interaction.guild.members.cache.get(interaction.user.id);
    user.setNickname(NickNameString)}

        }
}
        }
        
               //Deny Reason Modal Submit
       if (!interaction.isModalSubmit()) return;
       if (interaction.customId.includes('DenyStaffModal-')) {
        const UserID = interaction.customId.slice(15)
           let reasondeny = interaction.fields.getTextInputValue('DenialReasonTextInput')
                           const DenyNotifyEmbed = new EmbedBuilder()
                           .setDescription(`<@${UserID}> you were denied from the verification for the reason below:\n ${reasondeny}`) 
                           .setTitle(`${client.user.username}`)
                           .setColor(config.color)
                           .setFooter({text:`${client.user.username} by Z-Dev`})

                           const DenyUpdateStaffEmbed = new EmbedBuilder()
                           .setDescription(`<@${UserID}> was denied from the verification for the reason below:\n ${reasondeny} \n\nDenied by <@${interaction.user.id}>`) 
                           .setTitle(`${client.user.username}`)
                           .setColor(config.color)
                           .setFooter({text:`${client.user.username} by Z-Dev`})
                           const DenyUpdateButton = new ActionRowBuilder()
                           .addComponents(
                               new ButtonBuilder()
                               .setLabel('Z-Dev Github')
                               .setEmoji('1083979315328335944')
                               .setURL('https://github.com/Zesty-ZDev')
                               .setStyle('Link'),
                           );

                           interaction.update({embeds:[DenyUpdateStaffEmbed], components:[DenyUpdateButton]})
                           client.users.send(UserID,{embeds:[DenyNotifyEmbed]})
                           .catch (() => interaction.channel.send({content: `<@${UserID}> could not be contacted via DM's thus they could not be informed of the denial reason`}))
                           
       } 
    }
}
