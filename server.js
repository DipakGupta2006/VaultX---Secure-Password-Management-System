const express = require("express");
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.send("hello world ")
});



app.listen(3000, () => {
    console.log("server runing at port 3000")
})