module.exports = {
    execute(message, args, model) {
        let days = Math.floor(model.client.uptime / 86400000);
        let hours = Math.floor(model.client.uptime / 3600000) % 24;
        let minutes = Math.floor(model.client.uptime / 60000) % 60;
        let seconds = Math.floor(model.client.uptime / 1000) % 60;
        message.channel.send(`Žingsniui dirbu jau:\n${days} dien., ${hours} val., ${minutes} min. ir ${seconds} sek.`);
    }
};