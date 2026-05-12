export default async function handler(req, res) {
    
    if (req.method !== "POST") {
        return res.status(405).json({ erro: "Método não permitido" });
    }

    try {

        const { pergunta, imagem } = req.body;

        // 🔥 RESPOSTA SIMPLES (FUNCIONA SEM API EXTERNA)
        let resposta = "";

        if (imagem && pergunta) {
            resposta = `Recebi sua imagem + pergunta: "${pergunta}".\nAnálise simulada ativa.`;
        } 
        else if (imagem) {
            resposta = "Recebi sua imagem. Sistema em análise.";
        } 
        else if (pergunta) {
            resposta = `Você perguntou: "${pergunta}".\nResposta automática do sistema funcionando.`;
        } 
        else {
            resposta = "Envie uma pergunta ou imagem.";
        }

        return res.status(200).json({
            resposta
        });

    } catch (error) {

        return res.status(500).json({
            erro: "Erro interno no servidor",
            detalhe: error.message
        });
    }
}
