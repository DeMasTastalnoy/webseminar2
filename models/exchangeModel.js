const pool = require("../config/db");

const Exchange = {
    getAllOffers: async () => {
        const { rows } = await pool.query("SELECT * FROM exchange_offers");
        return rows;
    },

    getOfferById: async (id) => {
        const { rows } = await pool.query("SELECT * FROM exchange_offers WHERE id = $1", [id]);
        return rows[0];
    },

    createOffer: async (plantId, userId, offerType) => {
        const { rows } = await pool.query(
            "INSERT INTO exchange_offers (plant_id, user_id, offer_type) VALUES ($1, $2, $3) RETURNING *",
            [plantId, userId, offerType]
        );
        return rows[0];
    },

    updateOfferStatus: async (id, status) => {
        const { rows } = await pool.query(
            "UPDATE exchange_offers SET status = $1 WHERE id = $2 RETURNING *",
            [status, id]
        );
        return rows[0];
    },

    deleteOffer: async (id) => {
        await pool.query("DELETE FROM exchange_offers WHERE id = $1", [id]);
    },
};

module.exports = Exchange;
