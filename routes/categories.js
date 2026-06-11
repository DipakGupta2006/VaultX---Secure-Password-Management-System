const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM passwords ORDER BY category, app_name"
        );

        const categories = {
            Website: [],
            Application: [],
            "Social Media": [],
            Banking: [],
            Work: [],
            Other: []
        };

        rows.forEach(password => {
            const category = password.category ? password.category : "Other";
            if (categories[category]) {
                categories[category].push(password);
            } else {
                categories.Other.push(password);
            }
        });

        res.render('categories', { categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;