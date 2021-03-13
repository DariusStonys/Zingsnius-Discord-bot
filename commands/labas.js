const Discord = require('discord.js');

module.exports = {
    execute(message, args, model) {
        const embed = new Discord.RichEmbed()
        .setTitle("Vardenis pavardenis")
        .setColor("#38b6ff")
        .setThumbnail("https://zingsnis.lt/wp-content/themes/u-design/styles/common-images/logo.png")
        .addField("Skyrius:", "X skyrius")
        .setFooter("Sveikinu atvykus į " + message.guild.name.slice(0,-1) + "ę!")
        //.setDescription("Sveiki atvykę į " + message.guild.name.slice(0,-1) + "ę!")
        //.setFooter("Prisijungė prie " + message.guild.name + "s")
        // .setDescription("Sveiki atvykę į " + member.guild.name + `, ${member}!`)
        // .setFooter("Prisijungė prie " + member.guild.name)
        //.setTimestamp();
        message.channel.send(embed);
	}
};

// Note - sutvarkyti šią komandą į general nario prisijungimo prie serverio listenerį