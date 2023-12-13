require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const productsRouter = require('./routes/products.route');
var cors = require('cors');

app.use(
    cors()
  );

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to mongoDb'));



app.use(express.json());
app.use('/products', productsRouter);

app.listen(PORT, () => console.log('Server listening on port ', PORT));