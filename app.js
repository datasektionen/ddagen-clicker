const crypto = require("crypto")
const express = require("express")
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const app = express()
const port = 3000
const oneDay = 1000 * 60 * 60 * 24;

const sessionSecret = crypto.randomBytes(128).toString("hex");

app.use(sessions({
    secret: sessionSecret,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Lösenordet kommer bara ställas in en gång för alla användare:
var adminPassword = "";
var adminPasswordSet = false;

// Den faktiska countern:
var counter = 0;

app.get("/", (req,res) => {
    if (!adminPasswordSet)
        res.sendFile("views/create_password.html", {root:__dirname});
    else if (req.session.loggedIn)
        res.sendFile("views/admin.html", {root:__dirname});
    else
        res.sendFile("views/index.html", {root:__dirname});
});

app.get("/logout",(req,res) => {
    req.session.destroy();
    res.redirect("/");
});

app.post("/login", (req, res) => {
    // Inloggning möjlig även om lösenordet ej är satt, men gör inget.
    if (req.body.password == adminPassword) {
        req.session.loggedIn = true
        console.log(req.session)
        res.redirect("/");
    } else {
        res.sendFile("views/wrong_password.html", {root:__dirname});
    }
})

app.post("/set_admin_password", (req, res) => {
    if (!adminPasswordSet) {
        adminPassword = req.body.password;
        adminPasswordSet = true;
    }

    res.redirect("/");
})

app.post("/counter_increase", (req, res) => {
    if (req.session.loggedIn) {
        counter++;
        res.send(String(counter));
    } else {
        res.status(401).end();
    }
})

app.post("/counter_decrease", (req, res) => {
    if (req.session.loggedIn) {
        counter = Math.max(counter - 1, 0);
        res.send(String(counter));
    } else {
        res.status(401).end();
    }
})

app.post("/get_counter", (req, res) => {
    res.send(String(counter));
})

app.listen(port, () => {
    console.log(`D-Dagen Clicker, port: ${port}`)
})
