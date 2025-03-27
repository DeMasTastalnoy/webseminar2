const db = require('../config/db');

const getAllItems = async () => {
    const result = await db.query('SELECT * FROM items');
    return result.rows;
};

const addItem = async (name, description) => {
    const result = await db.query(
        'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
    );
    return result.rows[0];
};

module.exports = { getAllItems, addItem };