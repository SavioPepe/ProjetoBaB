const pool = require('../config/database');

// Função para obter perfil de acesso do usuário (GET)
async function obterPerfilAcesso(usuarioId) {
    const query = 'SELECT perfil FROM usuarios WHERE id = $1';
    const valores = [usuarioId];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao obter perfil de acesso:', erro);
        throw erro;
    }
}

// Função para inserir perfil de acesso do usuário (POST)
async function inserirPerfilAcesso(usuarioId, perfil) {
    const query = 'INSERT INTO usuarios ("id", "perfil") VALUES ($1, $2)';
    const valores = [usuarioId, perfil];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rowCount > 0; // Retorna true se a inserção foi bem-sucedida
    } catch (erro) {
        console.error('Erro ao inserir perfil de acesso:', erro);
        throw erro;
    }
}

// Função para atualizar perfil de acesso do usuário (UPDATE)
async function atualizarPerfilAcesso(usuarioId, novoPerfil) {
    const query = 'UPDATE usuarios SET perfil = $1 WHERE id = $2 RETURNING *';
    const valores = [novoPerfil, usuarioId];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o perfil atualizado
    } catch (erro) {
        console.error('Erro ao atualizar perfil de acesso:', erro);
        throw erro;
    }
}

// Função para excluir perfil de acesso do usuário (DELETE)
async function deletarPerfilAcesso(usuarioId) {
    const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
    const valores = [usuarioId];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o perfil excluído
    } catch (erro) {
        console.error('Erro ao excluir perfil de acesso:', erro);
        throw erro;
    }
}

// Função para visualizar todos os perfis de acesso (GET)
async function visualizarPerfisAcesso() {
    const query = 'SELECT id, perfil FROM usuarios';

    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao visualizar perfis de acesso:', erro);
        throw erro;
    }
}

module.exports = { 
    obterPerfilAcesso,
    inserirPerfilAcesso,
    atualizarPerfilAcesso,
    deletarPerfilAcesso,
    visualizarPerfisAcesso
};
