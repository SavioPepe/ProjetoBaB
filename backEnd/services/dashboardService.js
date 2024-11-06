const pool = require('../config/database');

// Função para obter todos os dados do dashboard
async function obterDadosDashboard() {
    const query = 'SELECT * FROM dashboard_data';
    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao obter dados do dashboard:', erro);
        throw erro;
    }
}

// Função para obter dados do dashboard por ID
async function obterDadosDashboardPorId(id) {
    const query = 'SELECT * FROM dashboard_data WHERE id = $1';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao obter dados do dashboard por ID:', erro);
        throw erro;
    }
}

// Função para adicionar dados ao dashboard (POST)
async function inserirDadosDashboard(dados) {
    const query = 'INSERT INTO dashboard_data (coluna1, coluna2) VALUES ($1, $2) RETURNING *';
    const valores = [dados.coluna1, dados.coluna2]; // Ajuste conforme as colunas exatas
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao adicionar dados ao dashboard:', erro);
        throw erro;
    }
}

// Função para atualizar dados do dashboard por ID (PUT)
async function atualizarDadosDashboard(id, dados) {
    const query = 'UPDATE dashboard_data SET coluna1 = $1, coluna2 = $2 WHERE id = $3 RETURNING *';
    const valores = [dados.coluna1, dados.coluna2, id]; // Ajuste conforme as colunas exatas
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao atualizar dados do dashboard:', erro);
        throw erro;
    }
}

// Função para deletar dados do dashboard por ID (DELETE)
async function deletarDadosDashboard(id) {
    const query = 'DELETE FROM dashboard_data WHERE id = $1 RETURNING *';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows[0]; // Retorna o registro deletado
    } catch (erro) {
        console.error('Erro ao deletar dados do dashboard:', erro);
        throw erro;
    }
}

module.exports = {
    obterDadosDashboard,
    obterDadosDashboardPorId,
    inserirDadosDashboard,
    atualizarDadosDashboard,
    deletarDadosDashboard
};
