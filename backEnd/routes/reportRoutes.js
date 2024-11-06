const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para servir a página de relatórios
router.get('/report', (req, res) => {
    //res.sendFile(path.join(__dirname, '../frontend/public/report.html'));
    res.send('Rota report ativa');

});

// Rota para criar um novo relatório
router.post('/register-report', async (req, res) => {
    const { titulo, conteudo, dataCriacao, autor } = req.body;

    try {
        const novoRelatorio = await criarRelatorio(titulo, conteudo, dataCriacao, autor);
        res.status(201).json({ message: 'Relatório criado com sucesso!', relatorio: novoRelatorio });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao criar relatório', error: erro.message });
    }
});

// Rota PUT para atualizar um relatório existente
router.put('/update-report/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, dataCriacao, autor } = req.body;

    try {
        const relatorioAtualizado = await atualizarRelatorio(id, titulo, conteudo, dataCriacao, autor);
        res.status(200).json({ message: 'Relatório atualizado com sucesso!', relatorio: relatorioAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar relatório', error: erro.message });
    }
});

// Rota DELETE para excluir um relatório
router.delete('/delete-report/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deletarRelatorio(id);
        res.status(200).json({ message: 'Relatório excluído com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir relatório', error: erro.message });
    }
});

module.exports = router;
