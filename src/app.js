const fetch = require("node-fetch");
const express = require("express");
const sanitizer = require("sanitizer");
const path = require("path");
const app = express();


const APIKEY = "XXX";

app.use("/assets", express.static("public/assets"));
app.use("/earth.html", express.static("public/earth.html"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'));
})

app.get("/earth", (req, res) => {

    const input = sanitizer.escape(req.query.city);
    let city = input.split(",")[0];
    const country = input.split(",")[1];

    if (city != "" && city != undefined) {
        if (country != undefined) city += `,${country}`;
        const langChoice = sanitizer.escape(req.query.lang);

        const uri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}&units=metric&lang=${langChoice}`;
        console.log(uri);
        fetch(uri)
            .then(result => {
                result.json().then(response => {
                    res.json(response);
                })
            })
            .catch(error => console.log(error));
    }
    else{
        res.status(400).send({cod: 400});
    }

})

app.get("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/not_found.html'));
})

app.listen("8080");