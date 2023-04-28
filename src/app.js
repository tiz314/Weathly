const express = require("express");
const sanitizer = require("sanitizer");
const path = require("path");
const app = express();


const APIKEY = "XXX";

app.use("/assets", express.static("public/assets"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'));
})

app.get("/earth", (req, res) => {

    const input = sanitizer.escape(req.query.city);
    res.send(input);
    const city = input.split(",")[0];
	const country = input.split(",")[1];

})

app.get("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/not_found.html'));
})

app.listen("8080");