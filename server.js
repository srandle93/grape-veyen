// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.
const express = require("express");
const exhb = require("express-handlebars");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");


const db = require('./public/app');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect("mongodb://localhost/articleList", { useNewUrlParser: true });


app.get("/", (req, res) => {
    res.sendFile("/public/index.html");
  });

app.get("/scrape", (req, res) => {
  axios.get("https://www.msn.com")
  .then((response) => {
    const $ = cheerio.load(response.data);
    const results = [];
    $("article h2").each((i, element) => {
      const title = $(element).children("a").text();
      const link = $(element).find("a").attr("href");
      
      results.push({
        title: title,
        link: link
      });

      db.Article.create(results)
      .then(dbArticle => {
        console.log(dbArticle);
      });
    });
  res.render(results);
  console.log(results);
  });
});

app.get("/articles", (req, res) => {
  db.Article.find({})
  .then(dbArticle => {
    res.json(dbArticle);
  })
});

app.get("/articles/:id", (req, res) => {
  db.Article.findOne({ _id: req.params.id })
    .then(dbArticle => {
      res.json(dbArticle);
    });
});

app.post("/articles/:id", (req, res) => {
  // Create a new note and pass the req.body to the entry
  db.Article.find(req.body)
    .then(dbArticle => {
      return db.Article.Update({ _id: req.params.id })
    })
    .then(function(dbArticle) {
      res.render("/saved");
    })
});
app.get("/saved", (req, res) => {
  res.send(saved);
});

app.listen(PORT, () => {
    console.log("App running on port 3000!");
  });