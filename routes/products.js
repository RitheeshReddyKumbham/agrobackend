// server/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

router.post('/', async (req, res) => {
  const { name, price } = req.body;
  const product = await Product.create({ name, price });
  res.status(201).json(product);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  await Product.update({ name, price }, { where: { id } });
  res.json({ message: 'Product updated' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  res.status(204).end();
});

module.exports = router;