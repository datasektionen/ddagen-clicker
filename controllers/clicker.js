const path = require("path");

// The actual counter for the clicker:
var counter = 0;

exports.index = (req, res) => {
    // Make sure the page reloads each time so that login/logout works:
    res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");

    if (req.session.loggedIn)
        res.sendFile("views/admin.html", {root: path.join(__dirname, "..")});
    else
        res.sendFile("views/index.html", {root: path.join(__dirname, "..")});
};

exports.counterIncrease = (req, res) => {
    if (req.session.loggedIn) {
        counter++;
        res.send(String(counter));
    } else {
        res.status(401).end();
    }
};

exports.counterDecrease = (req, res) => {
    if (req.session.loggedIn) {
        counter = Math.max(counter - 1, 0); // < 0 should not be possible
        res.send(String(counter));
    } else {
        res.status(401).end();
    }
};

exports.counterReset = (req, res) => {
    if (req.session.loggedIn) {
        counter = 0;
        res.send(String(counter));
    } else {
        res.status(401).end();
    }
};

exports.getCounter = (_, res) => {
    res.send(String(counter));
};
