const { EmbedBuilder, InteractionType,ButtonBuilder, TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const config = require(`../../config.json`)
module.exports = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        let client = interaction.client;
// Verify Button
        if (interaction.isButton()) {
            if (interaction.customId === `ButtonVerifyEntry`) {
                        const CharacterNameModal = new ModalBuilder()
                            .setCustomId('VerifyModal')
                            .setTitle('Character Name');

                        const CharacterNameInput = new TextInputBuilder()
                            .setCustomId('CharacterNameTextInput')
                            .setLabel("Enter your Characters name")
                            .setStyle(TextInputStyle.Short)

                            const SteamNameInput = new TextInputBuilder()
                            .setCustomId('SteamNameTextInput')
                            .setLabel("Enter your Steam name")
                            .setStyle(TextInputStyle.Short)

                        const CharacterName = new ActionRowBuilder().addComponents(CharacterNameInput);
                        const SteamName = new ActionRowBuilder().addComponents(SteamNameInput);
                        CharacterNameModal.addComponents(CharacterName, SteamName)

                        interaction.showModal(CharacterNameModal)
                    }
                    }

                    if (interaction.isButton()) {
                        if (interaction.customId.includes(`ButtonVerifyEntryStaff-`)) {
                            const userID = interaction.customId.slice(23)

                            let guild = client.guilds.cache.get(interaction.guild.id)

                            guild.members.fetch()
                            if (guild.members.cache.has(userID)){
                                

                                let member = guild.members.fetch(userID)

                            const VerifyButtonUpdateEmbed = new EmbedBuilder()
                            .setDescription(`<@${userID}> is now verified \n\n Verified by <@${interaction.user.id}>`) 
                            .setTitle(`${client.user.username}`)
                            .setColor(config.color)
                            .setFooter({text:`${client.user.username} by Z-Dev`})

                            const LinkButton = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setLabel('Z-Dev Github')
                                .setEmoji('1083979315328335944')
                                .setURL('https://github.com/Zesty-ZDev')
                                .setStyle('Link'),
                            );

                            member.then(function(result) {
                                //Checks if roletoadd is empty
                                if (!config.roletoadd == ``){
                                result.roles.add(config.roletoadd)}

                                //Checks if roletoremove is empty
                                if (!config.roletoremove == ``){
                                result.roles.remove(config.roletoremove)}
                                
                                interaction.update({embeds:[VerifyButtonUpdateEmbed], components:[LinkButton]})
                                });

                            } 
                            else{
                                const ErrorUpdateEmbed = new EmbedBuilder()
                                .setDescription(`<@${userID}> is no longer in the discord!`) 
                                .setTitle(`${client.user.username}`)
                                .setColor(config.color)
                                .setFooter({text:`${client.user.username} by Z-Dev`})
                                const LinkButton = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setLabel('Z-Dev Github')
                                    .setEmoji('1083979315328335944')
                                    .setURL('https://github.com/Zesty-ZDev')
                                    .setStyle('Link'),
                                );
                                interaction.update({embeds:[ErrorUpdateEmbed], components:[LinkButton]})
                            }                                                             
   
                        }}

                        if (interaction.isButton()) {
                            if (interaction.customId.includes(`ButtonDenyEntryStaff-`)) {
                                global.userIDGLOBAL = interaction.customId.slice(21)
                                const DenyReason = new ModalBuilder()
                            .setCustomId('DenyStaffModal')
                            .setTitle('Denial Reason');

                        const DenialReasonInput = new TextInputBuilder()
                            .setCustomId('DenialReasonTextInput')
                            .setLabel("Enter denial reason below")
                            .setStyle(TextInputStyle.Short)

                        const DenialReasonActionRow = new ActionRowBuilder().addComponents(DenialReasonInput);
                        DenyReason.addComponents(DenialReasonActionRow)
                            interaction.showModal(DenyReason)
                            }}

        }
    }

