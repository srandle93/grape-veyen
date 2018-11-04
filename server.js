// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const exhb = require("express-handlebars");
const mongoose = require("mongoose");

const app = require('./public/app');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
// app.get("/", function(req, res) {
//     res.send(app);
//   });
// Make a request via axios to grab the HTML body from the site of your choice
axios.get("https://www.msn.com")
.then((response) => {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  const $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  const results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("title").each((i, element) => {

    const title = $(element).children().text();
    const link = $(element).find("a").attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});

// Listen on port 3000
app.listen(PORT, () => {
    console.log("App running on port 3000!");
  });

