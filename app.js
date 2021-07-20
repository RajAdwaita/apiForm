const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { request } = require("http");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

    // console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = 'https://us6.api.mailchimp.com/3.0/lists/023e9bbff5'

    const options = {
        method: "POST",
        auth: "adwaita:0a58f5d4d2c6436617ff4f3e3b8ef17c-us6"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            // res.send("Error detected in signing up");
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("server on PORT 3000");
})

















// API KEY MAILCHIMP
// 0a58f5d4d2c6436617ff4f3e3b8ef17c-us6


// LIST ID 
// 023e9bbff5