const express = require('express');
const path = require('path');
const router = express.Router();
const {inserirUsuario, atualizarUsuario,deletarUsuario} = require('../services/userService');

// Rota para servir a página de Usuário
router.get('/user', (req, res) => {
    res.send('Rota usuario ativa');
    // res.sendFile(path.join(__dirname, '../frontend/public/user.html'));
});

// Rota para cadastrar um novo usuário
router.post('/register-user', async (req, res) => {
    const { nome, matricula, email, senha, perfil } = req.body;

    try {
        const novoUsuario = await inserirUsuario(nome, matricula, email, senha, perfil);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: erro.message });
    }
});

// Rota para atualizar um usuário existente
router.put('/update-user/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, matricula, email, senha, perfil } = req.body;

    try {
        const usuarioAtualizado = await atualizarUsuario(id, nome, matricula, email, senha, perfil);
        res.status(200).json({ message: 'Usuário atualizado com sucesso!', usuario: usuarioAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error: erro.message });
    }
});

// Rota para remover um usuário
router.delete('/delete-user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deletarUsuario(id);
        res.status(200).json({ message: 'Usuário removido com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao remover usuário', error: erro.message });
    }
});

module.exports = router;
