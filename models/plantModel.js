const pool = require("../config/db");

const Plant = {
    getAll: async () => {
        const { rows } = await pool.query("SELECT * FROM plants");
        return rows;
    },

    getById: async (id) => {
        const { rows } = await pool.query("SELECT * FROM plants WHERE id = $1", [id]);
        return rows[0];
    },

    create: async (userId, name, type, description, region) => {
        const { rows } = await pool.query(
            "INSERT INTO plants (user_id, name, type, description, region) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [userId, name, type, description, region]
        );
        return rows[0];
    },

    update: async (id, name, type, description, region) => {
        const { rows } = await pool.query(
            "UPDATE plants SET name = $1, type = $2, description = $3, region = $4 WHERE id = $5 RETURNING *",
            [name, type, description, region, id]
        );
        return rows[0];
    },

    delete: async (id) => {
        await pool.query("DELETE FROM plants WHERE id = $1", [id]);
    },
};

module.exports = Plant;