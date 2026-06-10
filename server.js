require("dotenv").config();
const express = require("express");
const session = require("express-session");
const pool = require("./db");
const app = express();
const path = require('path');
const crypto = require('crypto');
const port = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));
app.set("view engine", "ejs");

const add = require("./routes/add");
const view = require("./routes/view");
const generate = require("./routes/generate");



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

app.post("/register", async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    if (!username || !email || !password || !confirm_password) {
        return res.status(400).send("Please fill all fields.");
    }
    if (password !== confirm_password) {
        return res.status(400).send("Passwords do not match.");
    }

    try {
        const hashedPassword = hashPassword(password);
        await pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
        return res.redirect("/");
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).send("Email already registered.");
        }
        console.error(error);
        return res.status(500).send("Server error while registering.");
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Please enter username and password.");
    }

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username]);
        if (rows.length === 0) {
            return res.status(401).send("Invalid username or password.");
        }

        const user = rows[0];
        const hashedPassword = hashPassword(password);
        if (user.password !== hashedPassword) {
            return res.status(401).send("Invalid username or password.");
        }

        req.session.username = user.username;
        return res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error while logging in.");
    }
});

app.get("/dashboard", (req, res) => {
    if (!req.session || !req.session.username) {
        return res.redirect("/");
    }

    res.render("Dashboard", { username: req.session.username.toUpperCase() });
});

app.use('/add', add);
app.use('/view', view);
app.use('/generate', generate);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
