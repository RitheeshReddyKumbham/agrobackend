// server/server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
});