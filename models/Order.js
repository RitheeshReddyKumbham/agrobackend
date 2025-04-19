// server/models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const OrderItem = require('./OrderItem');

const Order = sequelize.define('Order', {
  buyerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactInfo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
});

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Order;