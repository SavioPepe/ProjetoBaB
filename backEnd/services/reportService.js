const pool = require('../config/database');

// Função para gerar relatório completo de talões
async function obterRelatorioCompleto() {
    const query = 'SELECT * FROM taloes_relatorio';

    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao gerar relatório completo de talões:', erro);
        throw erro;
    }
}

// Função para gerar relatório de talões com filtro por data de recebimento
async function obterRelatorioPorDataRecebimento() {
    const query = `
        SELECT * FROM taloes_relatorio
        WHERE data_recebimento IS NOT NULL
        ORDER BY data_recebimento DESC
    `;

    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao gerar relatório por data de recebimento:', erro);
        throw erro;
    }
}

// Função para gerar relatório com contagem de talões por status
async function obterRelatorioPorStatus() {
    const query = `
        SELECT status, COUNT(*) AS quantidade
        FROM taloes_relatorio
        GROUP BY status
    `;

    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao gerar relatório por status:', erro);
        throw erro;
    }
}

// Função para gerar relatório com dados específicos e filtro de data
async function obterRelatorioDadosEspecificos(dataInicio, dataFim) {
    const query = `
        SELECT id, codigo, data_recebimento
        FROM taloes_relatorio
        WHERE data_recebimento BETWEEN $1 AND $2
    `;
    const valores = [dataInicio, dataFim];

    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao gerar relatório com dados específicos:', erro);
        throw erro;
    }
}

module.exports = { 
    obterRelatorioCompleto,
    obterRelatorioPorDataRecebimento,
    obterRelatorioPorStatus,
    obterRelatorioDadosEspecificos
};
