const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

//#region CREATE
router.post('/', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        inventoryStatus: req.body.inventoryStatus,
        category: req.body.category,
        image: req.body.image,
        rating: req.body.rating
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//#endregion

//#region READ
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', getProduct, (req, res) => {
    res.send(res.product);
});

//#endregion

//#region UPDATE
router.patch('/:id', getProduct, async (req, res) => {
    const updates = req.body;
    for (const key in updates) {
        res.product[key] = updates[key]
    }

    try {
        const updatedproduct = await res.product.save();
        res.json(updatedproduct);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//#endregion

//#region DELETE
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.deleteOne();
        res.json({ message: 'Delete success' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
//#endregion

async function getProduct(req, res, next) {
    let product;

    try {
        product = await Product.findOne({ id: req.params.id });
        if (product === null) {
            return res.status(404).json({ message: 'No product found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.product = product;
    next();
}

module.exports = router;