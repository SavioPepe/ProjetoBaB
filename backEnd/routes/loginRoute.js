const express = require('express');
const path = require('path');
const router = express.Router();

// Rota para servir a página de login
router.get('/login', (req, res) => {
    //res.sendFile(path.join(__dirname, '../frontend/public/login.html'));
    res.send('Rota login ativa');

});

// Método POST para tratar dados enviados para a rota /register-login
router.post('/register-login', (req, res) => {
    res.json({ message: 'Requisição POST recebida com sucesso!' });
});

// Método PUT para atualizar dados na rota /update-login (exemplo: redefinir senha)
router.put('/update-login', (req, res) => {
    const updatedData = req.body; // Dados atualizados do usuário
    console.log('Dados de login atualizados:', updatedData);

    res.status(200).json({ message: 'Dados de login atualizados com sucesso', updatedData });
});

// Método DELETE para remover um login (exemplo: excluir conta de usuário)
router.delete('/delete-login', (req, res) => {
    const { userId } = req.body; // Supondo que um userId é passado para identificar o usuário
    console.log('Conta de usuário a ser deletada com ID:', userId);

    res.status(200).json({ message: 'Conta de usuário deletada com sucesso', deletedUserId: userId });
});

module.exports = router;
