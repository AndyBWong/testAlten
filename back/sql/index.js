require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const productsRouter = require('./routes/products.route');

const db = require('./db');

app.use(express.json());
app.use('/products', productsRouter);

app.listen(PORT, () => console.log('Server listening on port ', PORT));