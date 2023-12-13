const express = require('express');
const router = express.Router();
const db = require('../db');

//#region CREATE
router.post('/', async (req, res) => {
    try {
        let product = {
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            inventoryStatus: req.body.inventoryStatus,
            category: req.body.category,
            image: req.body.image,
            rating: req.body.rating,
            id: req.body.id
        };

        const insertStmt = db.prepare(`
        INSERT INTO products (
            code,
            name,
            description,
            price,
            quantity,
            inventoryStatus,
            category,
            image, 
            rating
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = insertStmt.run(
            req.body.code,
            req.body.name,
            req.body.description,
            req.body.price,
            req.body.quantity,
            req.body.inventoryStatus,
            req.body.category,
            req.body.image,
            req.body.rating
        );
        product.id = result.lastInsertRowid;
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});
//#endregion

//#region READ
router.get('/', async (req, res) => {
    let products;
    try {
        const getAllProductsStmt = db.prepare(`
            SELECT *
            FROM PRODUCTS
        `);
        products = getAllProductsStmt.all();
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
    const updateStmt = db.prepare(`
      UPDATE products
      SET code = ?, name = ?, description = ?, price = ?, quantity = ?, inventoryStatus = ?, category = ?, image = ?, rating = ?
      WHERE id = ?
    `);
    try {
        for (const key in updates) {
            res.product[key] = updates[key];
        }
        let result = updateStmt.run(
            res.product.code,
            res.product.name,
            res.product.description,
            res.product.price,
            res.product.quantity,
            res.product.inventoryStatus,
            res.product.category,
            res.product.image,
            res.product.rating,
            req.params.id);
        res.status(200).json({ message: 'update success' });
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
})
//#endregion

//#region DELETE
router.delete('/:id', getProduct, async (req, res) => {
    try {
        const delStmt = db.prepare(`
            DELETE FROM PRODUCTS
            WHERE products.id = ?
        `)
        let result = delStmt.run(req.params.id);
        res.json({ message: 'Delete success' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//#endregion


function getProduct(req, res, next) {
    let product;
    const getProductsStmt = db.prepare(`
        SELECT *
        FROM PRODUCTS
        WHERE PRODUCTS.id = ?
    `);
    try {
        product = getProductsStmt.get(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'No product found' });
        }
        product.id = req.params.id
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.product = product
    next();
}

module.exports = router;