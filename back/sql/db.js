const Database = require('better-sqlite3');


const db = new Database(process.env.DATABASE_PATCH , { verbose: console.log });
const initQrystmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS 
    products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT,
        name TEXT,
        description TEXT,
        price REAL,
        quantity INTEGER,
        inventoryStatus TEXT,
        category TEXT,
        image TEXT,
        rating REAL 
    ) STRICT
`);
initQrystmt.run();
module.exports = db; 