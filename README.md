# 🤖 T. Ars - Discord AI Assistant

O **T. Ars** é um bot de Discord sarcástico, inteligente e altamente técnico. 

## 🧠 Inspiração
* **Personalidade e Nome**: Inspirado no robô **TARS** do filme *Interstellar*, herdando seu humor ácido e níveis de honestidade ajustáveis.
* **Conceito**: Inspirado no **M. Arvin** do Fabio Akita, servindo como um assistente que não tem paciência para códigos mal escritos, mas que entrega soluções geniais.

---

## ✨ Funcionalidades

O bot utiliza o modelo **Gemini 2.5 Flash** para processar requisições com alta velocidade e precisão:

* **!learn**: Explica conceitos complexos de programação de forma direta e didática.
* **!review**: Analisa códigos, identifica bugs e sugere refatorações seguindo boas práticas de engenharia.
* **!news**: Recebe uma URL, extrai o conteúdo e gera um resumo crítico das principais notícias tecnológicas.

---

## 🛠️ Tecnologias e Resiliência

* **Motor**: Google Gemini 2.5 Flash API.
* **Estabilidade**: Sistema de *Retry* automático para erros 503 (Servidor Ocupado) e tratamento de cota 429.
* **Escalabilidade**: Sistema de particionamento de mensagens para contornar o limite de 2000 caracteres do Discord.

---

## 🚀 Como Instalar

1. Clone o repositório:
   ```bash
   git clone [https://github.com/Thiago-Graciano/T.-Ars-bot.git](https://github.com/Thiago-Graciano/T.-Ars-bot.git)
