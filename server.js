

//ENTRY POINT OF APP
// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
// var path = require("path");
// var axios = require("axios");
// var bodyParser = require("body-parser");



// Initialize Express
var app = express();

//set up static folder (public) for our web app
app.use(express.static("public"));


// Database configuration
//Save the URL of our database and the name of the collection
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);

//logs any erros if mongodb has issues
db.on("error", function(error) {
  console.log("Database Error:", error);
});



//ROUTES=================================


// Main route (simple Hello World Message)
app.get("/", function (req, res) {
  res.send("Hello world");
});

//=========================================

// Retrieve data from database
app.get("/all", function(req, res) {
  db.scrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
      console.log(found);
    }
      // res.sendFile(path.join(__dirname,"./public/index.html"));
  });
});

//===============================================

// Scrape data from site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request for the news section of `ycombinator`
  request("https://news.ycombinator.com", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);

    // console.log(html);

    // //An empty array to save the scraped data
    // var result = [];


    // Find each element with a "title" class
    $(".title").each(function(i, element) {
      //Save the text of the element (this) in a "title variable"
      var title = $(element).children("a").text();
      //In this element look at its child elements
      //Save values for any href attributes
      var link = $(element).children().attr("href");

      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the scrapedData db
        db.scrapedData.insert({
        // result.push({
          title: title,
          link: link
        },
         function (err, inserted) {
           if (err) {
             // Log the error if one is encountered during the query
             console.log(err);
           } else {
             // Otherwise, log the inserted data
             console.log(inserted);
           }
        });
          }
        });
    });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
