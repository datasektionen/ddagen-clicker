const axios = require("axios");
const path = require("path");

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};

exports.login = (req, res) => {
    var callbackUrl;

    if (process.env.NODE_ENV === "production") {
        callbackUrl = "https://clicker.ddagen.se/login/";
    } else {
        // localhost.datasektionen.se will automatically point to your local computer:
        callbackUrl = `http://localhost.datasektionen.se:${process.env.PORT}/login/`;
    }

    res.redirect(`https://login.datasektionen.se/login?callback=${callbackUrl}`);
};

exports.loginWithToken = (req, res) => {
    // Make sure the token doesn't contain any special characters:
    const token = req.params.token.replace(/[^a-zA-Z0-9]/gi, "");

    // Construct the url for verification of the token:
    const url = "https://login.datasektionen.se/verify/"
                 + token
                 + "?api_key="
                 + process.env.LOGIN_VERIFICATION_TOKEN;

    axios.get(url).then(axiosRes => {
        if (typeof axiosRes.data.user === "undefined") {
            res.status(400).end();
        } else {
            checkUserPermission(req, res, axiosRes.data.user);
        }
    }).catch(error => {
        console.error(error);
        res.status(500).end();
    });
};

function checkUserPermission(req, res, uid) {
    const url = `https://pls.datasektionen.se/api/user/${uid}/ddagen-clicker`;

    axios.get(url).then(axiosRes => {     
        if (axiosRes.data.includes("admin")) {
            req.session.loggedIn = true;
            res.redirect("/");
        } else {
            res.sendFile("views/no_permission.html", {root: path.join(__dirname, "..")});
        }
    }).catch(error => {
        console.error(error);
        res.status(500).end();
    });
}
