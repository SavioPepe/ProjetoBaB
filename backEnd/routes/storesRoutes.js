const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para servir a página de lojas
router.get('/stores', (req, res) => {
    //res.sendFile(path.join(__dirname, '../frontend/public/stores.html'));
    res.send('Rota store ativa');

});

// Rota para adicionar uma nova loja
router.post('/register-store', async (req, res) => {
    const { nome, localizacao, telefone, email } = req.body;

    try {
        const novaLoja = await adicionarLoja(nome, localizacao, telefone, email);
        res.status(201).json({ message: 'Loja adicionada com sucesso!', loja: novaLoja });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao adicionar loja', error: erro.message });
    }
});

// Rota PUT para atualizar uma loja existente
router.put('/update-store/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, localizacao, telefone, email } = req.body;

    try {
        const lojaAtualizada = await atualizarLoja(id, nome, localizacao, telefone, email);
        res.status(200).json({ message: 'Loja atualizada com sucesso!', loja: lojaAtualizada });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar loja', error: erro.message });
    }
});

// Rota DELETE para remover uma loja
router.delete('/delete-store/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await removerLoja(id);
        res.status(200).json({ message: 'Loja removida com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao remover loja', error: erro.message });
    }
});

module.exports = router;
