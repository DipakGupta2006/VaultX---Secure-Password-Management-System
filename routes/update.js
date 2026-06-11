const express = require('express');
const router = express.Router();
const pool = require('../db');


// Show Update Page
router.get('/', async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM passwords WHERE deleted_at IS NULL"
        );


        res.render("update", { 
            passwords: rows 
        });


    }
    catch (err) {

        console.error("Error:", err);

        res.status(500).send("Internal Server Error");

    }

});





// Update Password
router.post('/update-password', async (req, res) => {


    const {
        id,
        app_name,
        category,
        username,
        password,
        notes,
        favorite

    } = req.body;



    try {


        await pool.query(

            `
            UPDATE passwords

            SET 
            app_name = ?,
            category = ?,
            username = ?,
            password = ?,
            notes = ?,
            favorite = ?

            WHERE id = ?

            `,

            [
                app_name,
                category,
                username,
                password,
                notes,
                favorite ? 1 : 0,
                id
            ]

        );



        res.redirect("/view");


    }

    catch(err){

        console.error("Update Error:",err);

        res.status(500).send("Internal Server Error");

    }


});





module.exports = router;