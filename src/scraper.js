const axios = require('axios')
const cheerio = require('cheerio')

async function scrapeURL(url) {
  const { data } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  })

  const $ = cheerio.load(data)

  // remove elementos desnecessários
  $('script, style, nav, footer, header').remove()

  const title = $('title').text().trim()
  const body = $('article, main, .content, body')
    .first()
    .text()
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 3000) // limita pra não explodir o contexto

  return { title, body }
}

module.exports = { scrapeURL }