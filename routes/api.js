const router = require('express').Router();
const Transaction = require('../models/transaction.js');

router.post('/api/transaction', async ({ body }, res) => {
   try {
      const transaction = await Transaction.create(body);
      res.json(transaction);
   } catch (error) {
      console.log(error);
      res.status(500).json(error);
   }
});

router.post('/api/transaction/bulk', async ({ body }, res) => {
   try {
      const transactions = await Transaction.insertMany(body);
      res.json(transactions);
   } catch (error) {
      console.log(error);
      res.status(500).json(error);
   }
});

router.get('/api/transaction', async (req, res) => {
   try {
      const transactions = await Transaction.find({}).sort({ date: -1 });
      res.json(transactions);
   } catch (error) {
      console.log(error);
      res.status(500).json(error);
   }
});

module.exports = router;
