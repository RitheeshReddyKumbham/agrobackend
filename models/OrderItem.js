// server/models/OrderItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

module.exports = OrderItem;