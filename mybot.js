const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const  client = new Discord.Client();
const datos = require("./datos.json");
let prefix = datos.prefix

//INICO DEL BOT Y REGISTRO DE ERRORES Y WANRS

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

client.on("ready", () => {
console.log(`Encendido, conectado en ${client.guilds.size} servidores🍪 y  ${client.users.size} usuarios.`);
   client.user.setPresence( {
       status: "online",
       game: {
           name: `ob.ayuda | Estoy en ${client.guilds.size} servidores🍪`,
   
           type: "PLAYING"
       }
    
    });
});

//CONFIG startsWitch

client.on("message", (message) => {

if (message.content.startsWith(prefix +"ping")) {
  let ping = Math.floor(message.client.ping);
  message.channel.send(':ping_pong: `'+ping+' ms.` Pong!'); 
}
if (message.content.startsWith(prefix +"servers")){
  message.channel.send({embed: {
    color: 4266883,
    description: `:mag_right:Me encuentro en **${client.guilds.size}** servidores  y  **${client.users.size}** usuarios Online:chart_with_upwards_trend:`
  }});
}
//PLAY LIST BOT <--- CONFIG MUSIC
if (message.content === '!playlist') {
  message.channel.send(":notes:**Reproduciendo Lista, porfavor espere...**")
  if (message.channel.type !== 'text') return;

        const { voiceChannel } = message.member;

        if (!voiceChannel) {
            return message.reply('por favor únete a un canal de voz primero!');
        }

        voiceChannel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=1IafAR4ovuY', { filter: 'audioonly' });
            const dispatcher = connection.playStream(stream);

            dispatcher.on('end', () => voiceChannel.leave());
        });
    }
//CONTINUACION CONFIG startWitch

if (message.content.startsWith(prefix +"hola")) {
  message.channel.send("Hola que tal?:wave:");
}
if(message.content.startsWith(prefix +"cookies")){
    const embed = new Discord.RichEmbed()
    .setColor(0x046224)
    .setThumbnail(message.author.avatarURL)
    .setDescription("**alguien tiene hambre? porque traje unas ricas galletas de**")
    .setTimestamp()
    .addField(":point_right:**__Galletas de CHOCOLATE__**", ":cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie:", true)
    .addBlankField(true)
    .addField(":point_right:**__Galletas de FRESA__**", ":cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie:", true)
    .addBlankField(true)
    .addField(":point_right:**__Galletas de COCO__**", ":cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie::cookie:", true);

    message.channel.send({embed});
}
if(message.content.startsWith(prefix + 'ayuda')){

  message.channel.send('**'+message.author.username+'**| Se te enviaron los comandos por mensaje privado:incoming_envelope::white_check_mark:');
  message.react('510975977250095104');
  message.author.send('**COMANDOS DE wRs Obsidian**\n```\n'+
                      '-> '+prefix+'ping           :: Comprueba la latencia del bot y de tus mensajes.\n'+
                      '-> '+prefix+'servers        :: Muestra el numero los servidores en los que se encuentra el bot.\n'+                      
                      '-> '+prefix+'avatar <@user> :: Muestra el avatar de un usuario.\n'+
                      '-> '+prefix+'playlist       :: Con este comando podras escuchar una lista de reproduccion automatica.\n'+
                      '-> '+prefix+'radio          :: Te permite escuchar buena musica.\n'+
                      '-> '+prefix+'decir          :: Hace que el bot diga un mensaje.\n'+
                      '-> '+prefix+'user <@user>   :: Muestra información sobre un usuario mencioando.\n'+
                      '-> '+prefix+'serverinfo     :: Muestra información sobre el servidor en el que estas.\n'+
                      '-> '+prefix+'botinfo        :: Muestra información sobre el Bot.\n'+
                      '-> '+prefix+'cookies        :: Comparte galletas de varios tipos.\n'+
                      '-> '+prefix+'8ball          :: El bot respondera a tus preguntas.\n'+
                      '-> '+prefix+'ban <@user>    :: Banear a un usuario del servidor incluye razon.\n'+
                      '-> '+prefix+'kick <@user>   :: Expulsar a un usuario del servidor incluye razon.\n'+
                      '-> '+prefix+'hola           :: Saluda al Bot.\n```\n\n'+
                      '**invitacion del bot se encuentra en nuestro server oficial** :arrow_down:\n'+
                      '**Obsidian - Server guía y de soporte Únete :** \nhttps://discord.gg/p2JHvdd');
  
}
if (message.content.startsWith(prefix +"botinfo" )){
  const embed = new Discord.RichEmbed() 
  .setTitle("Server Obsidian Support :arrow_left:Click aqui")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor(0x00AE86)
  .setDescription("**Para invitar al bot tienes que contactar al CREADOR**")
  .setFooter("Informacion del bot", client.user.avatarURL)
  .setTimestamp()
  .setURL("https://discord.gg/p2JHvdd")
  .addField(":shield:Support",
    ":white_small_square:**¿Quieres ser parte del support? pues que esperas! cotacta al CREADOR**")
  .addField(":chains:Creador", "『ERR🅾R』『4🅾4』™#2711", true)
  .addBlankField(true)
  .addField(":file_cabinet:Prefix", "**El prefix del bot es:** ob.", true)
  .addBlankField(true)
  .addField(":globe_with_meridians:Pagina", "**Facebook:**https://www.facebook.com/WRs.SnaXs/", true)
  .addBlankField(true)
  .addField(":outbox_tray:Anuncio", "__correr la voz sobre este nuevo bot__:speaking_head:", true)
  .addBlankField(true)
  .addField(":inbox_tray:Sugerencias", "__Ayudanos con sugerencias para el bot en nuestro servidor oficial__", true);
  message.channel.send({embed});
}
//CONFIG ARGS COMMANDS

 const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
 
 if(command === 'kick' ){

  let user = message.mentions.users.first();
  let razon = args.slice(1).join(' ');
  
  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien:loudspeaker:').catch(console.error);
  if (!razon) return message.channel.send('Escriba una razón, `ob.kick @username [razón]`');
  if (!message.guild.member(user).kickable) return message.reply('No puedes expulsar al usuario mencionado:no_entry_sign:');
   
  message.guild.member(user).kick(razon);
  message.channel.send(`**${user.username}**, fue expulsado del servidor:white_check_mark: razón: ${razon}.`);
 }
 
 if(command === 'ban'){
    
  let user = message.mentions.users.first();
  let razon = args.slice(1).join(' ');

  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien:loudspeaker:').catch(console.error);
  if(!razon) return message.channel.send('Escriba un razón, `ob.ban @username [razón]`');
  if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado:no_entry_sign:');
  

  message.guild.member(user).ban(razon);
  message.channel.send(`**${user.username}**, fue baneado del servidor:white_check_mark: razón: ${razon}.`);

}
 if(command === 'user'){
  let userm = message.mentions.users.first()
  if(!userm){
    var user = message.author;
    
      const embed = new Discord.RichEmbed()
      .setThumbnail(user.avatarURL)
      .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
      .addField(':video_game:Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
      .addField(':mag_right:ID', user.id, true)
      .addField(':bar_chart:Estado', user.presence.status, true)
      .addField(':trident:Apodo', message.member.nickname, true)
      .addField(':ballot_box:Cuenta Creada', user.createdAt.toDateString(), true)
      .addField(':calendar_spiral:Fecha de Ingreso', message.member.joinedAt.toDateString())
      .addField(':scroll:Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
      .setColor(0x66b3ff)
      
     message.channel.send({ embed });
  }else{
    const embed = new Discord.RichEmbed()
    .setThumbnail(userm.avatarURL)
    .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
    .addField(':video_game:Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
    .addField(':mag_right:ID', userm.id, true)
    .addField(':bar_chart:Estado', userm.presence.status, true)
    .addField(':ballot_box:Cuenta Creada', userm.createdAt.toDateString(), true)
    .setColor(0x66b3ff)
    
   message.channel.send({ embed });
  }
}
if(command === 'avatar'){

  let img = message.mentions.users.first()
  if (!img) {

      const embed = new Discord.RichEmbed()
      .setImage(`${message.author.avatarURL}`)
      .setColor(0x66b3ff)
      .addField("**Admirenme**", ":camera_with_flash: :sunglasses:", true)
      .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
      message.channel.send({ embed });

  } else if (img.avatarURL === null) {

      message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");

  } else {

      const embed = new Discord.RichEmbed()
      .setImage(`${img.avatarURL}`)
      .setColor(0x66b3ff)
      .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
      message.channel.send({ embed });

  };

}

//CODING MUSIC Join | Leave | Radio

if (command === 'join') { 
  let Canalvoz = message.member.voiceChannel;
  if (!Canalvoz || Canalvoz.type !== 'voice') {
  message.channel.send('¡Necesitas unirte a un canal de voz primero!.').catch(error => message.channel.send(error));
  } else if (message.guild.voiceConnection) {
  message.channel.send('Ya estoy conectado en un canal de voz.');
  } else {
   message.channel.send('Conectando...').then(m => {
        Canalvoz.join().then(() => {
             m.edit(':white_check_mark: | Conectado exitosamente.').catch(error => message.channel.send(error));
       }).catch(error => message.channel.send(error));
   }).catch(error => message.channel.send(error));
  }
}
if (command === 'leave') { 
  let Canalvoz = message.member.voiceChannel;
  if (!Canalvoz) {
      message.channel.send('No estoy en un canal de voz.');
  } else {
      message.channel.send('Dejando el canal de voz.').then(() => {
      Canalvoz.leave();
      }).catch(error => message.channel.send(error));
  }   
}
if (command === 'radio') {
  let voiceChannel = message.member.voiceChannel;
  if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
      voiceChannel.join().then(conexion =>{
        conexion.playStream('http://stream.electroradio.fm:80/192k/;');
      message.channel.send('**Radio Music Obsidian ON** :notes:')
      return;
    })
    .catch(console.error);
}

//CONTINUACION DE CODING COMMANDS

let texto = args.join(" ");
if(command === 'decir'){
    if(!texto) return message.channel.send(`Escriba un contenido pára decir.`);
    message.channel.send(texto);
    
}
if(command === '8ball'){
  var rpts = ["Sí", "No", "¿Por qué?", "ella no te ama:broken_heart:", "Tal vez", "No sé", "Definitivamente no", " ¡Claro que si! "," Sí "," No "," ella te ama:heart: "," eres loco! "];
  if (!texto) return message.reply(`Escriba una pregunta.`);
  message.channel.send(message.member.user+' a su pregunta `'+texto+'` mi respuesta es: `'+ rpts[Math.floor(Math.random() * rpts.length)]+'`');

}
if(command === 'serverinfo'){
  var server = message.guild;

  const embed = new Discord.RichEmbed()
  .setThumbnail(server.iconURL)
  .setAuthor(server.name, server.iconURL)
  .addField('ID', server.id, true)
  .addField('Region', server.region, true)
  .addField('Creado el', server.joinedAt.toDateString(), true)
  .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id+')', true)
  .addField('Miembros', server.memberCount, true)
  .addField('Roles', server.roles.size, true)
  .setFooter(`Serverinfo Solicitado por: ${message.author.username}#${message.author.discriminator}`)
  .setColor(0x66b3ff)
  
 message.channel.send({ embed });

}
if (command === 'servericon'){
  var server = message.guild;

  const embed = new Discord.RichEmbed()
  .setImage(`${message.guild.iconURL}`)
  
  message.channel.send({ embed });

}
//REACCION VOTOS SUPPORT
      if (message.content === 'voting') {      
        message.react('👍');
        message.react('👎');
          message.channel.send("**Votaciones**")
    }
    if (command === '04l1bot'){
      message.channel.send({embed: {
        color: 12437598,
        description: ":arrow_down:**Hey! que onda, me llamo Obsidian:smile: te vengo a invitar a que votes que tal te parecen mis servicios** ```Para votar Tienes que reaccionar aqui abajo```"
      }});
  }
  
     
    







//TOKEN DEL BOT
});
client.login(process.env.BOT_TOKEN);
