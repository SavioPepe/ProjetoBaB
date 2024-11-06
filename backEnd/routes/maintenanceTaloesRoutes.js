const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para servir a página de manutenção de talões
router.get('/maintenance-taloes', (req, res) => {
    //res.sendFile(path.join(__dirname, '../frontend/public/maintenanceTaloes.html'));
    res.send('Rota maintenance ativa');

});

// Rota para adicionar um novo talão de manutenção
router.post('/register-add-talao', async (req, res) => {
    const { numero, descricao, data, responsavel } = req.body;

    try {
        const novoTalao = await inserirTalao(numero, descricao, data, responsavel);
        res.status(201).json({ message: 'Talão de manutenção adicionado com sucesso!', talao: novoTalao });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao adicionar talão de manutenção', error: erro.message });
    }
});

// Rota PUT para atualizar um talão de manutenção
router.put('/update-talao/:id', async (req, res) => {
    const { id } = req.params;
    const { numero, descricao, data, responsavel } = req.body;

    try {
        const talaoAtualizado = await atualizarTalao(id, numero, descricao, data, responsavel);
        res.status(200).json({ message: 'Talão de manutenção atualizado com sucesso!', talao: talaoAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar talão de manutenção', error: erro.message });
    }
});

// Rota DELETE para excluir um talão de manutenção
router.delete('/delete-talao/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deletarTalao(id);
        res.status(200).json({ message: 'Talão de manutenção deletado com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao deletar talão de manutenção', error: erro.message });
    }
});

module.exports = router;
