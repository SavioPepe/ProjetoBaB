const pool = require('../config/database');

// Função para consultar o estoque de talões (GET)
async function obterEstoqueTaloes() {
    const query = 'SELECT * FROM estoque_taloes';

    try {
        const resultado = await pool.query(query);
        return resultado.rows; // Retorna todos os talões em estoque
    } catch (erro) {
        console.error('Erro ao consultar estoque de talões:', erro);
        throw erro;
    }
}

// Função para inserir um novo talão no estoque (POST)
async function inserirTalaoNoEstoque(codigo, quantidade, descricao) {
    const query = `
        INSERT INTO estoque_taloes ("codigo", "quantidade", "descricao")
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const valores = [codigo, quantidade, descricao];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o talão inserido no estoque
    } catch (erro) {
        console.error('Erro ao inserir talão no estoque:', erro);
        throw erro;
    }
}

// Função para atualizar um talão no estoque (UPDATE)
async function atualizarTalaoNoEstoque(talaoId, novaQuantidade, novaDescricao) {
    const query = `
        UPDATE estoque_taloes
        SET quantidade = $1, descricao = $2
        WHERE id = $3
        RETURNING *;
    `;
    const valores = [novaQuantidade, novaDescricao, talaoId];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o talão atualizado no estoque
    } catch (erro) {
        console.error('Erro ao atualizar talão no estoque:', erro);
        throw erro;
    }
}

// Função para excluir um talão do estoque (DELETE)
async function deletarTalaoDoEstoque(talaoId) {
    const query = `
        DELETE FROM estoque_taloes
        WHERE id = $1
        RETURNING *;
    `;
    const valores = [talaoId];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o talão excluído do estoque
    } catch (erro) {
        console.error('Erro ao excluir talão do estoque:', erro);
        throw erro;
    }
}

module.exports = { 
    obterEstoqueTaloes,
    inserirTalaoNoEstoque,
    atualizarTalaoNoEstoque,
    deletarTalaoDoEstoque
};
