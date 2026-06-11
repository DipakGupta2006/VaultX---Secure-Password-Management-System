const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get("/", async (req,res)=>{


    if(!req.session.username){
        return res.redirect("/");
    }


    try{


        // Total Password Count

        const [totalPasswords] = await pool.query(
            "SELECT COUNT(*) AS count FROM passwords"
        );



        // Favorite Password Count

        const [favoritePasswords] = await pool.query(
            "SELECT COUNT(*) AS count FROM passwords WHERE favorite = 1"
        );



        // Category Count

        const [categories] = await pool.query(
            "SELECT COUNT(DISTINCT category) AS count FROM passwords"
        );



        // Recent Passwords

        const [recentPasswords] = await pool.query(
            "SELECT * FROM passwords ORDER BY id DESC LIMIT 5"
        );



        res.render("Dashboard",{

            username:req.session.username.toUpperCase(),

            totalPasswords:
            totalPasswords[0].count,


            favoritePasswords:
            favoritePasswords[0].count,


            categoryCount:
            categories[0].count,


            // Template expects `recent` variable
            recent: recentPasswords

        });



    }
    catch(err){

        console.log(err);

        res.status(500).send("Dashboard Error");

    }



});



module.exports = router;