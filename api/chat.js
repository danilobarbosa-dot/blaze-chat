```javascript id="2z2vyy"
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Método inválido"
    });
  }

  try {

    const { pergunta, imagem } = req.body;

    let content = [];

    if (pergunta) {
      content.push({
        type: "text",
        text: pergunta
      });
    }

    if (imagem) {
      content.push({
        type: "image_url",
        image_url: {
          url: imagem
        }
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",

      input: [{
        role: "user",
        content
      }]
    });

    return res.status(200).json({
      resposta: response.output_text
    });

  } catch (e) {

    console.log(e);

    return res.status(500).json({
      erro: "Erro OpenAI"
    });

  }

}
```
