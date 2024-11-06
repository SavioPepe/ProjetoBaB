const express = require('express');
const path = require('path');
const router = express.Router();

// Método GET para exibir a página do dashboard
router.get('/dashboard', (req, res) => {
    res.send('Rota dashboard ativa');
    //res.sendFile(path.join(__dirname, '../frontend/public/dashboard.html'));
});

// Método POST para tratar dados enviados para a rota /register-dashboard
router.post('/register-dashboard', (req, res) => {
    const data = req.body;
    console.log(data);

    res.status(200).json({ message: 'Dados recebidos com sucesso', receivedData: data });
});

// Método PUT para atualizar dados na rota /update-dashboard
router.put('/update-dashboard', (req, res) => {
    const updatedData = req.body;
    console.log('Dados atualizados:', updatedData);

    res.status(200).json({ message: 'Dados atualizados com sucesso', updatedData });
});

// Método DELETE para remover dados na rota /delete-dashboard
router.delete('/delete-dashboard', (req, res) => {
    const { id } = req.body; // Supondo que o identificador é enviado no corpo da requisição
    console.log('Dados a serem deletados com id:', id);

    res.status(200).json({ message: 'Dados deletados com sucesso', deletedId: id });
});

module.exports = router;
