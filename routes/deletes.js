const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM passwords");
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.render("deletes", { passwords: rows });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    };
});

router.post('/delete-password', async (req, res) => {
    try {
        const id = req.body.id || req.query.id || req.params.id;

        if (!id) {
            return res.status(400).send('Missing password id to delete');
        }

        // Use a connection to run delete + resequence in a transaction
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            await conn.query("DELETE FROM passwords WHERE id = ?", [id]);

            // Resequence ids starting from 1 ordered by current id
            await conn.query("SET @i = 0");
            await conn.query("UPDATE passwords SET id = (@i := @i + 1) ORDER BY id");

            // Reset auto_increment to next value
            const [countRows] = await conn.query("SELECT COUNT(*) AS cnt FROM passwords");
            const next = (countRows && countRows[0] && countRows[0].cnt) ? (countRows[0].cnt + 1) : 1;
            await conn.query("ALTER TABLE passwords AUTO_INCREMENT = ?", [next]);

            await conn.commit();
        } catch (txErr) {
            await conn.rollback();
            throw txErr;
        } finally {
            conn.release();
        }

        res.redirect('/view');
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    };
});


module.exports = router;
