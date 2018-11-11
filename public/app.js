const data = ("/articles", data => {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $(".data").append(`${data[i].title} ${"<br>"} ${data[i].link}`);
  }
});

// Click events home, savedArticles, scrapeArticles, clearArticles, saveArt
$("#home").on("click", () => {
  res.send('index', {
  });
});

$("#savedArticles").on("click", () => {
  $.ajax({
    method: "POST",
    url: `/saved/`,
    data: data
  })
  res.send(data);
});

$("#scrapeArticles").on("click", () => {
  $.ajax({
    method: "POST",
    url: "/articles",
    data: data
  })
  res.render("/scrape");
});

$("#saveArt").on("click", () => {
  $.ajax({
    method: "UPDATE",
    url: "/articles",
    data: data
  })
  res.render(data[i]);
});
$("#clearArticles").on("click", () => {
  $.ajax({
    method: "DELETE",
    url: "/",
    data: data
  })
  res.render(data.empty());
});

