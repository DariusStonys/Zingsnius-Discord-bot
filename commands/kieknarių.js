module.exports = {
    execute(message, args, model) {
		var memberCount = message.guild.members.filter(x => x.presence.status !== "offline").size;
		message.channel.send(`Viso Žingsniečių būstinėje narių yra: ${message.guild.memberCount}.\nŠiuo metu online narių: ${memberCount}.`);
	}
};

// TODO - galima pridėti didžiausio šiuo metu prisijungusio skyriaus (rolės) narių sk.