const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para servir a página de acesso do perfil
router.get('/profile-access', (req, res) => {
    //res.sendFile(path.join(__dirname, '../frontend/public/profileAccess.html'));
    res.send('Rota profile ativa');

});

// Rota para salvar as informações de acesso do perfil
router.post('/register-profile-access', async (req, res) => {
    const { userId, acesso } = req.body;

    try {
        const perfilAcesso = await salvarAcessoPerfil(userId, acesso);
        res.status(201).json({ message: 'Acesso do perfil salvo com sucesso!', perfilAcesso });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao salvar acesso do perfil', error: erro.message });
    }
});

// Rota PUT para atualizar as informações de acesso do perfil
router.put('/update-profile-access/:userId', async (req, res) => {
    const { userId } = req.params;
    const { acesso } = req.body;

    try {
        const perfilAcessoAtualizado = await atualizarAcessoPerfil(userId, acesso);
        res.status(200).json({ message: 'Acesso do perfil atualizado com sucesso!', perfilAcesso: perfilAcessoAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar acesso do perfil', error: erro.message });
    }
});

// Rota DELETE para remover o acesso do perfil
router.delete('/delete-profile-access/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        await deletarAcessoPerfil(userId);
        res.status(200).json({ message: 'Acesso do perfil deletado com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao deletar acesso do perfil', error: erro.message });
    }
});

module.exports = router;
