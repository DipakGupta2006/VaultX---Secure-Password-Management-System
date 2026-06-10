const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
     try{

        const [rows] = await pool.query(
            "SELECT * FROM passwords WHERE favorite = 1"
        );

        res.render("favorite", {passwords: rows});

    }catch(err){

        console.log(err);

        res.status(500).send("Server Error");
    }
})



module.exports = router;
