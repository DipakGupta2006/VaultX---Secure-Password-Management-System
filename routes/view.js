const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM passwords");
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.render("view", { passwords: rows });
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    };
});

router.get('/favorites', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM passwords WHERE favorite = 1");
        res.render("favorite", { passwords: rows });
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    };
});


module.exports = router;
