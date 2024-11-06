const pool = require('../config/database');

// Função para obter um envio de talão específico pelo ID
async function obterEnvioTalao(id) {
    const query = `
        SELECT * FROM taloes_envio
        WHERE id = $1
    `;
    const valores = [id];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao obter envio de talão:', erro);
        throw erro;
    }
}

// Função para inserir um novo envio de talão
async function inserirEnvioTalao(numeroTalao, destinatario, dataEnvio, descricao) {
    const query = `
        INSERT INTO taloes_envio (numero_talao, destinatario, data_envio, descricao)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const valores = [numeroTalao, destinatario, dataEnvio, descricao];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao inserir envio de talão:', erro);
        throw erro;
    }
}

// Função para atualizar o envio de um talão
async function atualizarEnvioTalao(id, numeroTalao, destinatario, dataEnvio, descricao) {
    const query = `
        UPDATE taloes_envio
        SET numero_talao = $1, destinatario = $2, data_envio = $3, descricao = $4
        WHERE id = $5
        RETURNING *
    `;
    const valores = [numeroTalao, destinatario, dataEnvio, descricao, id];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao atualizar envio de talão:', erro);
        throw erro;
    }
}

// Função para deletar o envio de um talão
async function deletarEnvioTalao(id) {
    const query = `
        DELETE FROM taloes_envio
        WHERE id = $1
    `;
    const valores = [id];

    try {
        await pool.query(query, valores);
    } catch (erro) {
        console.error('Erro ao deletar envio de talão:', erro);
        throw erro;
    }
}

module.exports = {
    obterEnvioTalao,
    inserirEnvioTalao,
    atualizarEnvioTalao,
    deletarEnvioTalao
};
