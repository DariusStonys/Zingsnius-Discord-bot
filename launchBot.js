//'use strict';

// Extract the required classes from the modules
const fs = require('fs');
/*const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })*/
const Discord = require('discord.js');

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
          model.isModerator = message.member.roles.find(x => x.name === "Moderatorius") !== 'undefined';

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