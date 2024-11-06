const pool = require('../config/database');

// Função para verificar o login do usuário
async function verificarLogin(email, senha) {
    const query = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2';
    const valores = [email, senha];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o usuário correspondente, se encontrado
    } catch (erro) {
        console.error('Erro ao verificar login:', erro);
        throw erro;
    }
}

module.exports = { verificarLogin };
