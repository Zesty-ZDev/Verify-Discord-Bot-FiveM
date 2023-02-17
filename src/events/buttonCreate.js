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
                    
        }
    }

