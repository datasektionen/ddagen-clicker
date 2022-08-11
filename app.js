const crypto = require("crypto");
const https = require("https");
const fs = require("fs");
const express = require("express")
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const clickerController = require("./controllers/clicker");
const loginController = require("./controllers/login");

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
const sessionSecret = crypto.randomBytes(32).toString("hex");

// Default values for environment variables. Documented in the README.
process.env.PORT     = typeof process.env.PORT     === "undefined" ? 3000          : process.env.PORT;
process.env.NODE_ENV = typeof process.env.NODE_ENV === "undefined" ? "development" : process.env.NODE_ENV;

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

// ---------------------------- //
//            Routes:           //
// ---------------------------- //

app.get("/", clickerController.index);

app.get("/logout", loginController.logout);

app.get("/login", loginController.login);

app.get("/login/:token", loginController.loginWithToken);

app.post("/counter_increase", clickerController.counterIncrease);

app.post("/counter_decrease", clickerController.counterDecrease);

app.post("/counter_reset", clickerController.counterReset);

app.post("/get_counter", clickerController.getCounter);

// ---------------------------- //
//      Start the server:       //
// ---------------------------- //

var server;

if (process.env.NODE_ENV === "production") {
    server = app;
} else {
    // If we are in development mode, we want to use self signed certificates for https to work:
    server = https.createServer({
        key: fs.readFileSync("key.pem"),
        cert: fs.readFileSync("cert.pem")
    }, app);
}

server.listen(process.env.PORT, () => {
    console.log(`D-Dagen clicker, port: ${process.env.PORT}`);
});
