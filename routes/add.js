const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', (req, res) => {
    res.render('add');
});

router.post('/submit', async (req, res) => {
    const app_name = req.body.app_name;
    const category = req.body.category;
    const username = req.body.username;
    const password = req.body.password;
    const notes = req.body.notes;
    const favorite = req.body.favorite ? 1 : 0;

    try{
        await pool.query(
            "INSERT INTO passwords (app_name, category, username, password, notes, favorite) VALUES (?, ?, ?, ?, ?, ?)",
            [app_name, category, username, password, notes, favorite]
        );
        const [rows] = await pool.query("SELECT * FROM passwords");
        res.render("view", {passwords:rows});
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }

});


module.exports = router;
