const Discord = require('discord.js');

module.exports = {
    execute(message, args, model) {
        const embed = new Discord.RichEmbed()
        .setTitle(model.goodbyes[model.goodbyesIndex])
        .setColor("#38b6ff")
        .setFooter("Moku rimuoti, yo! Aš toks hipsteris.");
        message.channel.send(embed);
    }
};