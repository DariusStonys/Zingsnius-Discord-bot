module.exports = {
    execute(message, args, model) {
		
		var mentionedMembers = message.mentions.members.array();
        var numberOfMembers = mentionedMembers.length;
		if (numberOfMembers === 0)
		{
			message.reply(`komandos argumentuose reikia paminėti bent vieną žmogų, pvz.: !myliu @Žingsnietis`);
		}
		else if	(numberOfMembers === 1)
        {
            if (mentionedMembers[0].user.id === model.client.user.id)
            {
                message.reply(`ir aš tave myliu!`);
            }
            else
            {
                message.channel.send(message.member.displayName + ` myli ` + mentionedMembers[0].displayName + ` 🥰`);
            }
        }
        else if (numberOfMembers >= 2)
        {
            var messageConstructor = message.member.displayName + ` myli `;
            for (var i = 0; i  < numberOfMembers - 2; i++) {
                messageConstructor += `${mentionedMembers[i].displayName}, `
            }

            messageConstructor += `${mentionedMembers[numberOfMembers - 2].displayName} ir ${mentionedMembers[numberOfMembers - 1].displayName} 💙`
            message.channel.send(messageConstructor);
        }
	}
};

// TODO - add random heart emoji