let currentTopic;
loadTopics();

$('#submit').click(function(){
  let topicValue = $("#topicInput").val();
  let videoValue = $("#videoInput").val();
  //let date = new date();
  alert(videoValue);
  saveVideo(topicValue, videoValue);
  loadTopics();
  loadVideos(topicValue);
  currentTopic = topicValue;
});

function tabClick(topic) {
  loadVideos(topic);
  currentTopic = topic;
}

function loadTopics() {
  let topicsVideos = getTopicsVideos();
  let keys = Object.keys(topicsVideos);
  $("#topics").html(keys.map(htmlTab));
}

function removeTab(topic) {
  deleteTopic(topic);
  if (currentTopic !== topic){
    loadTopics();
  } else {
    location.reload();
  }
}

function htmlTab(topic){
  return `<span onclick='tabClick("${topic}");' class = "anchorButton">
  <li class = "listOfTabs"><span class="tab">${topic}</span>
  </li><button onclick="removeTab('${topic}');">&#9986;</button></span>`;
};

function loadVideos(topic){
  let videos = getVideos(topic);
  $("#videos").html(videos.map(htmlVideo));
}

function removeVideo(id) {
  deleteVideo(currentTopic, id);
  loadVideos(currentTopic);
}

function htmlVideo(id){
  return `<span class="tab"><span>${id}</span><span></span>
<button onclick="removeVideo('${id}');">&#9986;</button>
</span>`;
}

$(".anchorButton").click(function(){
  let selectedTab = $(this).addClass("selected").siblings().removeClass("selected");
});


/*
1.ajax
2.node.js
3.google app engine
4.datastore
*/
