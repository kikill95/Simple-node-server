var express = require("express");
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* serves main page */
app.get("/", function(req, res) {
    res.sendfile('index.html');
});

app.post("/save", function(req, res) {
/* some server side logic */
    fs.readFile("data.json", "utf8", function(err, data) {
        var array = JSON.parse(data || "[]");
        array.push(req.body);

        fs.writeFile("data.json", JSON.stringify(array), function(err) {
            if (err) {
                throw err;
            }
            console.log('It\'s saved!');
        });
    });
    res.send(req.body); //sent data back
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res) {
    console.log('static file request : ' + req.params);
    res.sendfile( __dirname + req.params[0]);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
