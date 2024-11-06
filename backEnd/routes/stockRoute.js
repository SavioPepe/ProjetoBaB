const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para servir a página de estoque
router.get('/stock', (req, res) => {
    //res.sendFile(path.join(__dirname, '../frontend/public/stock.html'));
    res.send('Rota stock ativa');

});

// Rota para registrar um novo item no estoque
router.post('/register-stock', async (req, res) => {
    const { nome, quantidade, descricao } = req.body;

    try {
        const novoItemEstoque = await adicionarItemEstoque(nome, quantidade, descricao);
        res.status(201).json({ message: 'Item adicionado ao estoque com sucesso!', itemEstoque: novoItemEstoque });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao adicionar item no estoque', error: erro.message });
    }
});

// Rota PUT para atualizar um item existente no estoque
router.put('/update-stock/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, quantidade, descricao } = req.body;

    try {
        const itemAtualizado = await atualizarEstoque(id, nome, quantidade, descricao);
        res.status(200).json({ message: 'Item no estoque atualizado com sucesso!', itemEstoque: itemAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar item no estoque', error: erro.message });
    }
});

// Rota DELETE para remover um item do estoque
router.delete('/delete-stock/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deletarItemEstoque(id);
        res.status(200).json({ message: 'Item do estoque removido com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao remover item do estoque', error: erro.message });
    }
});

module.exports = router;
