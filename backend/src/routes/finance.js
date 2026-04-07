const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Como o front-end junta todos os meśes em "allData" no localstorage, 
// a API vai permitir um GET getAll e um POST save para compatibilidade fácil.

// Rota para buscar TODOS os dados do usuário (reconstruindo o 'allData')
router.get('/', authMiddleware, async (req, res) => {
  try {
    const records = await prisma.financeData.findMany({
      where: { userId: req.user.id }
    });

    // Formata do formato de tabela para o objeto original do app
    // ex: { '2026-04': { salary: 1000, fixed: {...}, extras: [...] } }
    const allData = {};
    records.forEach(record => {
      allData[record.monthKey] = record.data;
    });

    res.json(allData);
  } catch (error) {
    console.error('Error fetching finance data:', error);
    res.status(500).json({ error: 'Erro ao buscar dados financeiros' });
  }
});

// A rota do frontend atualiza o MonthData individualmente
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { monthKey, data } = req.body;
    
    if (!monthKey || !data) {
      return res.status(400).json({ error: 'monthKey e data são requiridos' });
    }

    const record = await prisma.financeData.upsert({
      where: {
        userId_monthKey: {
          userId: req.user.id,
          monthKey: monthKey
        }
      },
      update: {
        data: data
      },
      create: {
        userId: req.user.id,
        monthKey: monthKey,
        data: data
      }
    });

    res.json(record);
  } catch (error) {
    console.error('Error saving finance data:', error);
    res.status(500).json({ error: 'Erro ao salvar dados' });
  }
});

module.exports = router;
