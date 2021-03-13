module.exports = {
    execute(message, args, model) {
        if (model.isModerator)
        {
            message.channel.send(model.goodbyes[model.goodbyesIndex] + ' Iki pasimatymo!').then(m => {
                model.client.destroy();
            });
        }
        else
        {
            message.reply('atleisk, bet tik moderatorius gali naudotis šia komanda.')
        }
    }
};