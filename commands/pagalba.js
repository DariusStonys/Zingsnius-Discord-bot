const Discord = require('discord.js');

module.exports = {
    execute(message, args, model) {
        var description = "Štai kokias komandas aš moku:\n**!kiekdirbi** - parašau, kiek laiko dirbu online;\n**!kieknarių** - parašau, kiek narių yra Žingsniečių būstinėje ir kiek iš jų yra online;\n**!myliu @Žingsnietis** - parašau nurodytam žingsniečiui, kad tu jį myli;\n**!rimuok** - surimuoju lit fire beat'ą;\n**!sumuštinis @Žingsnietis1 @Žingsnietis2** - padedu tau padaryti sumuštinį su bent dviem nurodytais žingsniečiais."

        const embed = new Discord.RichEmbed()
        .setTitle("Žengiu į pagalbą!")
        .setColor("#38b6ff")
        .setDescription(description);
        message.channel.send(embed);
    }
};