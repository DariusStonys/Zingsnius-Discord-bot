module.exports = {
    execute(message, args, model) {
        if (model.isModerator)
        {
            message.channel.send(model.goodbyes[model.goodbyesIndex] + ' Tuoj sugrįšiu.').then(m => {
                model.client.destroy().then(() => {
                    model.client.login(model.token);
                })
            });
        } else {
            message.reply('atleisk, bet tik moderatorius gali naudotis šia komanda.')
        }
    }
};