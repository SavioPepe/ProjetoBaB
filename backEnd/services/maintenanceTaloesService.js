const pool = require('../config/database');

// Função para buscar todos os talões em manutenção (GET)
async function obterTaloesEmManutencao() {
    const query = `SELECT * FROM manutencao_taloes`;

    try {
        const resultado = await pool.query(query);
        return resultado.rows; // Retorna todos os talões em manutenção
    } catch (erro) {
        console.error('Erro ao obter talões em manutenção:', erro);
        throw erro;
    }
}

// Função para inserir um novo talão em manutenção (POST)
async function inserirTalaoEmManutencao(talaoId, descricao) {
    const query = `
        INSERT INTO manutencao_taloes (talao_id, descricao)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const valores = [talaoId, descricao];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o talão inserido em manutenção
    } catch (erro) {
        console.error('Erro ao inserir talão em manutenção:', erro);
        throw erro;
    }
}

// Função para atualizar um talão em manutenção (UPDATE)
async function atualizarTalaoEmManutencao(talaoId, novaDescricao) {
    const query = `
        UPDATE manutencao_taloes
        SET descricao = $1
        WHERE talao_id = $2
        RETURNING *;
    `;
    const valores = [novaDescricao, talaoId];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o talão atualizado
    } catch (erro) {
        console.error('Erro ao atualizar talão em manutenção:', erro);
        throw erro;
    }
}

// Função para excluir um talão em manutenção (DELETE)
async function deletarTalaoEmManutencao(talaoId) {
    const query = `
        DELETE FROM manutencao_taloes
        WHERE talao_id = $1
        RETURNING *;
    `;
    const valores = [talaoId];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o talão excluído
    } catch (erro) {
        console.error('Erro ao excluir talão em manutenção:', erro);
        throw erro;
    }
}

module.exports = {
    obterTaloesEmManutencao,
    inserirTalaoEmManutencao,
    atualizarTalaoEmManutencao,
    deletarTalaoEmManutencao
};
