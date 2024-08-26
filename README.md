
# Verify Bot by Zdev
The Verify Bot will ensure users that join your FiveM Discord Community change their nick name to match the format "CharacterName [SteamName]" with a manual approval system with buttons sent to staff in a staff channel

### Z-Dev Discord
Join [Here](https://discord.gg/EV9cpmp6qf) for support


## FAQ

#### What is "staffchannel" in the config.js?

This determines the channel that staff use to accept or deny the verification request sent from the users wishing to verify!

#### What is "roletoremove" &  "roletoadd" in the config.js?

This will set the role/s the bot will remove or/and give to the user once the staff press the "Verify user" button 

#### What is "color" in the config.js?

This sets the color of all the embeds the bot will send including the "Verify" button embed and the staff request embeds, this value has to be a color hex for example "#9aaae3"

#### What is "autoverify" in the config.js ?

This value is a true/false (bool) value and when set to true will allow users to verify themselves without any staff approval, when set to false the system requires all names to be verified with staff.

#### Why am I getting permission errors?

You are likely receiving these errors because the bot does not have the permission to give roles or the role it is trying to give it above the bot itself thus it cannot give this role

#### Why am I getting a DisallowedIntents error?

The Bot requires the "SERVER MEMBERS INTENT" enabled in the discord developer portal. To do this head to the developer portal and select your application then select bot and scroll down to enable and disabled intents at this time however the bot only needs the "SERVER MEMBERS INTENT" enabled
