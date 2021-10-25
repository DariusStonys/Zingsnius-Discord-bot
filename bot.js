//'use strict';

// Extract the required classes from the modules
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
const Discord = require('discord.js');

//const { adminID, guildID, prefix, token } = require('./config.json');
const token = process.env.token;
const prefix = process.env.prefix;
const adminID = process.env.adminID;
const guildID = process.env.guildID;

const botReplies = require('./bot-replies.json');
const { error } = require('console');

// Initialize Bot
const client = new Discord.Client({disableEveryone: false});
let guild = new Discord.Guild();

// Set Model parameters
let model = botReplies;
model.client = client;
model.token = token;
model.countGoodbyes = model.goodbyes.length;

// Add Commands to Bot
const init = async () => {
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(__dirname + '/commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(__dirname + `/commands/${file}`);
	client.commands.set(file.replace('.js',''), command);
}

// Add event listeners
client.on('ready', () => {
    console.log(`\nLogged in as ${client.user.tag}!`);
    guild = client.guilds.get(guildID);
});

//client.on('guildMemberAdd', member => {
//    const channel = member.guild.channels.find('name', 'welcome');
//    if (!channel) return;
//    var Wembed = new Discord.RichEmbed()
//        .setAuthor("User Join!")
//        .setDescription("Welcome to " + member.guild.name + `, ${member}!`)
//        .setFooter("Joined on")
//        .setTimestamp();
//    channel.send(Wembed);
//});

client.on('message', message => {
    if (!message.content.startsWith(prefix)) 
    {
        switch (message.channel.id) {
            case '703660735678513254': // channel.name = "pasiūlymai"
              message.react("👍");
              message.react("👎");
              break;

            case '703662035598049311': // channel.name = "balsavimai"
              message.react("👍");
              message.react("👎");
              break;
                
            case '709086433100693615': // channel.name = "bot-test"
              break;
            }
    }
    else if (message.content.startsWith(prefix) || message.author.bot) {
        if (message.channel.id !== '709086433100693615') return; // channel.name = "bot-test"

        // Check that arguments are not split by multiple spaces
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        // Get command
        const command = client.commands.get(commandName);
        if (command === undefined) {
          return message.reply(`sad beep. Tokios komandos nemoku.`);
        } 

        // Set Model parameters
        //model.isModerator = message.member.roles.find(x => x.name === "Moderatorius") !== 'undefined';

        try {
            command.execute(message, args, model);
        } catch (error) {
            console.error(error);
            message.reply(`sad beep. Man nepavyko įgyvendinti tavo komandos :'(`);
        }

        if (command.args && !args.length) {
            return message.reply(`sad beep. Turi pateikti bent vieną argumentą šiai komandai.`);
        }
    }
});



client.on('messageReactionAdd', (reaction, user) => {
    if (!(reaction.emoji == "🖥️" && reaction.message.author.bot && !user.bot)) return;

    model.goodbyesIndex = Math.floor(Math.random() * model.countGoodbyes);
    guild.channels.get("681891586300575765") // channel.name = "bendras"
        .send(model.goodbyes[model.goodbyesIndex] + ` <@${user.id}>, ačiū Tau už pagalbą testuojant 💙`,);
});

client.login(token);

}

init();





    // Check args
    //const amount = parseInt(args[0]);
    //if (isNaN(amount)) {
    //    return message.reply('that doesn\'t seem to be a valid number.');
    //}

    /*
    
    if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

    */