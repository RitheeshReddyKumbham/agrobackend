// server/routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const orders = await Order.findAll({
    include: [{ model: OrderItem, include: [Product] }],
  });
  res.json(orders);
});

router.post('/', async (req, res) => {
  const { buyerName, contactInfo, deliveryAddress, items } = req.body;
  const order = await Order.create({ buyerName, contactInfo, deliveryAddress });
  for (const item of items) {
    await OrderItem.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
    });
  }
  res.status(201).json(order);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Order.update({ status }, { where: { id } });
  res.json({ message: 'Order status updated' });
});

module.exports = router;