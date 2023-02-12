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
                            let member = guild.members.fetch(userID)

                            const VerifyButtonUpdateEmbed = new EmbedBuilder()
                            .setDescription(`<@${userID}> is now verified`) 
                            .setTitle(`${client.user.username}`)
                            .setColor(config.color)
                            .setFooter({text:`${client.user.username} by Quest Systems`})
                            const VerifyUpdateButton = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setLabel('Quest Systems Discord')
                                //.setEmoji('')
                                .setURL('https://discord.gg/9T7p9HjTQt')
                                .setStyle('Link'),
                            );


                            interaction.update({embeds:[VerifyButtonUpdateEmbed], components:[VerifyUpdateButton]})
                            member.then(function(result) {
                                result.roles.add(config.verifiedrole);
                             })

                             

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

                            //modal below
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

