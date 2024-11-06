const pool = require('../config/database');

// Função para consultar todas as lojas
async function obterLojas() {
    const query = 'SELECT * FROM lojas';

    try {
        const resultado = await pool.query(query);
        return resultado.rows; // Retorna todas as lojas
    } catch (erro) {
        console.error('Erro ao consultar lojas:', erro);
        throw erro;
    }
}

// Função para inserir uma nova loja
async function inserirLoja(nome, endereco) {
    const query = `
        INSERT INTO lojas ("nome", "endereco")
        VALUES ($1, $2)
        RETURNING *;
    `;
    const valores = [nome, endereco];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna a loja inserida
    } catch (erro) {
        console.error('Erro ao inserir loja:', erro);
        throw erro;
    }
}

// Função para atualizar uma loja existente
async function atualizarLoja(id, nome, endereco) {
    const query = `
        UPDATE lojas
        SET nome = $1, endereco = $2
        WHERE id = $3
        RETURNING *;
    `;
    const valores = [nome, endereco, id];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna a loja atualizada
    } catch (erro) {
        console.error('Erro ao atualizar loja:', erro);
        throw erro;
    }
}

// Função para deletar uma loja
async function deletarLoja(id) {
    const query = `
        DELETE FROM lojas
        WHERE id = $1
        RETURNING *;
    `;
    const valores = [id];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna a loja deletada
    } catch (erro) {
        console.error('Erro ao deletar loja:', erro);
        throw erro;
    }
}

module.exports = { 
    obterLojas, 
    inserirLoja, 
    atualizarLoja,
    deletarLoja
};
