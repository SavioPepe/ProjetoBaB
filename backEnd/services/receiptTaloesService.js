const pool = require('../config/database');

// Função para consultar todos os registros de talões (GET)
async function obterTaloes() {
    const query = 'SELECT * FROM taloes';

    try {
        const resultado = await pool.query(query);
        return resultado.rows; // Retorna todos os talões
    } catch (erro) {
        console.error('Erro ao consultar talões:', erro);
        throw erro;
    }
}

// Função para inserir um novo talão (POST)
async function inserirTalao(codigo, descricao) {
    const query = `
        INSERT INTO taloes ("codigo", "descricao")
        VALUES ($1, $2)
        RETURNING *;
    `;
    const valores = [codigo, descricao];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o talão inserido
    } catch (erro) {
        console.error('Erro ao inserir talão:', erro);
        throw erro;
    }
}

// Função para registrar o recebimento de um talão (atualizar campo de data de recebimento) (UPDATE)
async function registrarRecebimentoTalao(talaoId, dataRecebimento) {
    const query = `
        UPDATE taloes
        SET data_recebimento = $1
        WHERE id = $2
        RETURNING *;
    `;
    const valores = [dataRecebimento, talaoId];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o talão atualizado
    } catch (erro) {
        console.error('Erro ao registrar recebimento do talão:', erro);
        throw erro;
    }
}

// Função para atualizar as informações de um talão (UPDATE)
async function atualizarTalao(talaoId, novoCodigo, novaDescricao) {
    const query = `
        UPDATE taloes
        SET codigo = $1, descricao = $2
        WHERE id = $3
        RETURNING *;
    `;
    const valores = [novoCodigo, novaDescricao, talaoId];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o talão atualizado
    } catch (erro) {
        console.error('Erro ao atualizar talão:', erro);
        throw erro;
    }
}

// Função para excluir um talão (DELETE)
async function deletarTalao(talaoId) {
    const query = `
        DELETE FROM taloes
        WHERE id = $1
        RETURNING *;
    `;
    const valores = [talaoId];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0]; // Retorna o talão excluído
    } catch (erro) {
        console.error('Erro ao excluir talão:', erro);
        throw erro;
    }
}

module.exports = { 
    obterTaloes,
    inserirTalao,
    registrarRecebimentoTalao,
    atualizarTalao,
    deletarTalao
};
