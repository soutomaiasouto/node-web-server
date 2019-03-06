const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'html');




app.engine('html', require('hbs').__express);



app.use((req, res, next) => {

var log = `${now}: ${req.method} ${req.url}`;
var now = new Date().toString();

    console.log(log)
    fs.appendFile("server.log", log + "\n", (err) => {

        if(err) {

            console.log("Unable to append the file");
        }

        next();
    });

});

// app.use((req, res, next) => {

//     res.render("maintenance.hbs");

// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getFullYear", () => {

    return new Date().getFullYear();

});

hbs.registerHelper("uppercase", (text) => {

    return text.toUpperCase();

});


app.get("/", (req, res) => {

    res.render("index.hbs", {

        pageTitle: "Apoio",
        currentYear: new Date().getFullYear()

    });

});
app.get("/about", (req, res) => {

    res.render("about.html", {

        pageTitle: "Sobre",
        currentYear: new Date().getFullYear()

    });
    // res.send("<h2 style='text-align:center';>BAND ON THE RUN!</h2>")

    });

    app.get("/maintenance", (req, res) => {

        res.render("maintenance.hbs", {

        });
        
        
    });


app.listen(port, () => {

    console.log(`server is up on port ${port}`);

});