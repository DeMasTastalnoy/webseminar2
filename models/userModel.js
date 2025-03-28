const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
    create: async (name, email, password, region, town) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { rows } = await pool.query(
            "INSERT INTO users (name, email, password, region, town) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, region, town",
            [name, email, hashedPassword, region, town]
        );
        return rows[0];
    },

    findByEmail: async (email) => {
        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return rows[0];
    },

    findById: async (id) => {
        const { rows } = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [id]);
        return rows[0];
    },

    updateRegionAndTown: async (id, region, town) => {
        await pool.query(
            "UPDATE users SET region = $1, town = $2 WHERE id = $3",
            [region, town, id]
        );
    },

};



module.exports = User;