const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para servir a página de recibo de talões
router.get('/receipt-taloes', (req, res) => {
    //res.sendFile(path.join(__dirname, '../frontend/public/receiptTaloes.html'));
    res.send('Rota receipt ativa');

});

// Rota para cadastrar um novo recibo de talão
router.post('/register-receipt-taloes', async (req, res) => {
    const { numeroTalao, descricao, dataRecebimento, responsavelRecebimento } = req.body;

    try {
        const reciboTalao = await cadastrarReciboTalao(numeroTalao, descricao, dataRecebimento, responsavelRecebimento);
        res.status(201).json({ message: 'Recibo de talão cadastrado com sucesso!', reciboTalao });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar recibo de talão', error: erro.message });
    }
});

// Rota PUT para atualizar um recibo de talão
router.put('/update-receipt-taloes/:id', async (req, res) => {
    const { id } = req.params;
    const { numeroTalao, descricao, dataRecebimento, responsavelRecebimento } = req.body;

    try {
        const reciboTalaoAtualizado = await atualizarReciboTalao(id, numeroTalao, descricao, dataRecebimento, responsavelRecebimento);
        res.status(200).json({ message: 'Recibo de talão atualizado com sucesso!', reciboTalao: reciboTalaoAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar recibo de talão', error: erro.message });
    }
});

// Rota DELETE para remover um recibo de talão
router.delete('/delete-receipt-taloes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deletarReciboTalao(id);
        res.status(200).json({ message: 'Recibo de talão deletado com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao deletar recibo de talão', error: erro.message });
    }
});

module.exports = router;
