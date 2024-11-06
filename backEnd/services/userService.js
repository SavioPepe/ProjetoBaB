const pool = require('../config/database');

// Função para consultar todos os usuários
async function obterUsuarios() {
    const query = 'SELECT * FROM usuarios';

    try {
        const resultado = await pool.query(query);
        return resultado.rows; // Retorna todos os usuários
    } catch (erro) {
        console.error('Erro ao consultar usuários:', erro);
        throw erro;
    }
}

// Função para inserir um novo usuário
async function inserirUsuario(nome, matricula, email, senha, perfil = 'usuario') {
    const query = `
        INSERT INTO usuarios ("nome", "matricula", "email", "senha", "perfil")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const valores = [nome, matricula, email, senha, perfil];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o usuário inserido
    } catch (erro) {
        console.error('Erro ao inserir usuário:', erro);
        throw erro;
    }
}

// Função para atualizar um usuário existente
async function atualizarUsuario(id, nome, matricula, email, senha, perfil) {
    const query = `
        UPDATE usuarios
        SET nome = $1, matricula = $2, email = $3, senha = $4, perfil = $5
        WHERE id = $6
        RETURNING *;
    `;
    const valores = [nome, matricula, email, senha, perfil, id];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o usuário atualizado
    } catch (erro) {
        console.error('Erro ao atualizar usuário:', erro);
        throw erro;
    }
}

// Função para deletar um usuário
async function deletarUsuario(id) {
    const query = `
        DELETE FROM usuarios
        WHERE id = $1
        RETURNING *;
    `;
    const valores = [id];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o usuário deletado
    } catch (erro) {
        console.error('Erro ao deletar usuário:', erro);
        throw erro;
    }
}

module.exports = { 
       obterUsuarios,
       inserirUsuario,
       atualizarUsuario,
       deletarUsuario 
 };
