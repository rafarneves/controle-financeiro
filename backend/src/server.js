const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const financeRoutes = require('./routes/finance');

const app = express();

// Security: Configurando CORS para aceitar credentials (cookies)
app.use(cors({
  origin: true, // Em produção na Vercel, 'true' permite o domínio do frontend
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

const PORT = process.env.PORT || 3001;

// Só inicia o servidor se não estiver na Vercel (onde ele roda como function)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[🚀] Server is running on port ${PORT}`);
  });
}

module.exports = app;
