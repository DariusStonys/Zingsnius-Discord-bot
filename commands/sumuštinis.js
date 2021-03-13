module.exports = {
    execute(message, args, model) {
        const unfilteredMentions = message.mentions.members.array();
        let mentionedMembers = (members) => members.filter((um,i) => unfilteredMentions.indexOf(um) === i)

        var numberOfMembers = mentionedMembers.length;

        if (numberOfMembers < 2)
        {
            message.reply(`komandos argumentuose reikia paminėti bent du žmones, pvz.: !sumuštinis @Žingsnietis1 @Žingsnietis2`);
        }
        else if (numberOfMembers >= 2)
        {
            console.log(mentionedMembers[0]);
            var i;
            var messageConstructor = `Sumuštinis tarp ${message.author}, `;
            for (i = 0; i  < numberOfMembers - 2; i++) {
                messageConstructor += `${mentionedMembers[i].user}, `
            }
            // Add last two members
            messageConstructor += `${mentionedMembers[numberOfMembers - 2].user} ir ${mentionedMembers[numberOfMembers - 1].user} 💙`
            message.channel.send(messageConstructor);
        }
    }
};