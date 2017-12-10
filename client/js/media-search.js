import ajax from "./getJson.js"
import ejsClient from "./ejsClient.js"


ajax("/api/movies", function(movies) {
  movies.forEach(function(movie) {
    // ejsClient.render("media-thumbnail", {
    //   media: movie,
    //   mediaType: "movie"
    // }, function(html) {
    //   console.log(html);
    // })
  })
})
