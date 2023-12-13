const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        auto: true,
        unique: true,
        min: 1000,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    name:  {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity:  {
        type: Number,
        required: true
    },
    inventoryStatus: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }, 
    rating:  {
        type: Number,
        required: false
    },
});

module.exports = mongoose.model('Products', productSchema);