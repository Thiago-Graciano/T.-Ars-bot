require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js')
const { askTARS } = require('./ai')
const { scrapeURL } = require('./scraper')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

const PREFIX = process.env.PREFIX || '!'

client.once('clientReady', () => {
  console.log(`T. Ars online como ${client.user.tag}`)
})

client.on('messageCreate', async (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(PREFIX)) return

  const args = message.content.slice(PREFIX.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

// !learn <pergunta>
  if (command === 'learn') {
    const pergunta = args.join(' ')
    if (!pergunta) return message.reply('Pergunta o que? Manda a dúvida depois do !learn.')

    await message.channel.sendTyping()
    try {
      const resposta = await askTARS(`[MODO LEARN] ${pergunta}`)
      await sendLongMessage(message, resposta) // <--- Usando a nova função
    } catch (err) {
      message.reply('Erro ao consultar a IA. Verifica o terminal.')
      console.error(err)
    }
  }

  // !review <código>
  else if (command === 'review') {
    const codigo = args.join(' ')
    if (!codigo) return message.reply('Manda o código depois do !review.')

    await message.channel.sendTyping()
    try {
      const resposta = await askTARS(`[MODO REVIEW] Revisa esse código:\n${codigo}`)
      await sendLongMessage(message, resposta) // <--- Usando a nova função
    } catch (err) {
      message.reply('Erro ao consultar a IA. Verifica o terminal.')
      console.error(err)
    }
  }

  // !news <url>
  else if (command === 'news') {
    const url = args[0]
    if (!url || !url.startsWith('http')) return message.reply('Manda uma URL válida depois do !news.')

    await message.channel.sendTyping()
    try {
      const { title, body } = await scrapeURL(url)
      const resposta = await askTARS(`[MODO NEWS] Título: ${title}\n\nConteúdo: ${body}`)
      await sendLongMessage(message, resposta) // <--- Usando a nova função
    } catch (err) {
      message.reply('Não consegui acessar essa URL. Tenta outra.')
      console.error(err)
    }
  }

  // !tars (ajuda)
  else if (command === 'tars') {
    message.reply(
      `**T. Ars online.** Comandos disponíveis:\n\n` +
      `\`!learn <pergunta>\` — tira uma dúvida técnica\n` +
      `\`!review <código>\` — code review sem filtro\n` +
      `\`!news <url>\` — resumo e opinião sobre uma notícia`
    )
  }
})

// Função para dividir mensagens longas e evitar o erro de 2000 caracteres
async function sendLongMessage(message, text) {
  const limit = 2000;
  if (text.length <= limit) {
    return message.reply(text);
  }

  // Divide o texto em blocos de 2000
  const chunks = text.match(/[\s\S]{1,2000}/g) || [];
  
  for (const [index, chunk] of chunks.entries()) {
    if (index === 0) {
      await message.reply(chunk);
    } else {
      await message.channel.send(chunk);
    }
  }
}

client.login(process.env.DISCORD_TOKEN)