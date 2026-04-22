require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const personality = require('./personality');

// Inicialização direta
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askTARS(userMessage, attempts = 3) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const finalPrompt = `INSTRUÇÃO DE SISTEMA: ${personality}\n\nUSUÁRIO: ${userMessage}`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    // Se o erro for 503 e ainda tivermos tentativas, espera 2 segundos e tenta de novo
    if (error.status === 503 && attempts > 0) {
      console.log(`Model ocupado. Tentando novamente... (${attempts} restantes)`);
      await new Promise(res => setTimeout(res, 2000)); 
      return askTARS(userMessage, attempts - 1);
    }
    
    console.error("--- ERRO NA IA ---");
    throw error;
  }
}


module.exports = { askTARS };