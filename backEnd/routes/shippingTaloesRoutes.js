const express = require('express');
const path = require('path');
const router = express.Router();
const {obterEnvioTalao,inserirEnvioTalao,atualizarEnvioTalao,deletarEnvioTalao} = require('../services/shippingTaloes');
//cadastraEnvio, obtemEnvio,historicoEnvio,obterEnvioId




// Rota para servir a página de envios de talões
router.get('/shipping-taloes', (req, res) => {
   // res.sendFile(path.join(__dirname, '../frontend/public/shippingTaloes.html'));
    res.send('Rota shipping ativa');

});

// Rota para registrar o envio de um talão
router.post('/register-shipping-taloes', async (req, res) => {
    const { numeroTalao, destinatario, dataEnvio, descricao } = req.body;

    try {
        const envioTalao = await inserirEnvioTalao(numeroTalao, destinatario, dataEnvio, descricao);
        res.status(201).json({ message: 'Envio de talão registrado com sucesso!', envioTalao });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao registrar envio de talão', error: erro.message });
    }
});

// Rota PUT para atualizar um envio de talão
router.put('/update-shipping-taloes/:id', async (req, res) => {
    const { id } = req.params;
    const { numeroTalao, destinatario, dataEnvio, descricao } = req.body;

    try {
        const envioTalaoAtualizado = await atualizarEnvioTalao(id, numeroTalao, destinatario, dataEnvio, descricao);
        res.status(200).json({ message: 'Envio de talão atualizado com sucesso!', envioTalao: envioTalaoAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar envio de talão', error: erro.message });
    }
});

// Rota DELETE para remover um envio de talão
router.delete('/delete-shipping-taloes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deletarEnvioTalao(id);
        res.status(200).json({ message: 'Envio de talão deletado com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao deletar envio de talão', error: erro.message });
    }
});

module.exports = router;
