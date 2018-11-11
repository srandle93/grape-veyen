const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtSchema = new Schema({
  title:  String,
  link: String 
});

const Article = mongoose.model("Article", artSchema);

module.exports = Article;