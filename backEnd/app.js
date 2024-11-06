const express = require('express');
const path = require('path');
const app = express();

// Importação das rotas
const dashboardRoutes = require('./routes/dashboardRoutes');
const shippingTaloesRoutes = require('./routes/shippingTaloesRoutes');
const stockRoute = require('./routes/stockRoute');
const storesRoutes = require('./routes/storesRoutes');
const maintenanceTaloesRoutes = require('./routes/maintenanceTaloesRoutes');
const profileAccessRoutes = require('./routes/profileAccessRoutes');
const receiptTaloesRoutes = require('./routes/receiptTaloesRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware para servir arquivos estáticos
app.use(express.json()); // Necessário para processar JSON no corpo da requisição
app.use(express.static(path.join(__dirname, 'frontend/public')));

// Configuração das rotas
app.use(dashboardRoutes);
app.use(shippingTaloesRoutes);
app.use(stockRoute);
app.use(storesRoutes);
app.use(maintenanceTaloesRoutes);
app.use(profileAccessRoutes);
app.use(receiptTaloesRoutes);
app.use(reportRoutes);
app.use(userRoutes);

module.exports = app;  // Exporta o `app` para ser usado no `server.js`
