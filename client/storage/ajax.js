function getVideos(callback) {
  jQuery.get("/videos/", function(res){
    callback(res);
  });
}
