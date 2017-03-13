let currentTopic;
loadTopics();
selectExistingTab();

$(".fileInput").change(function(e){
  e.preventDefault();
  let topicValue = $("#topicInput").val().toUpperCase();
  let videoValue = $(".fileInput").val();
  saveVideo(topicValue, videoValue);
  loadTopics();
  loadVideos(videoValue);
  currentTopic = topicValue;
  location.reload();
});

function tabClick(topic) {
  loadTopics();
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
  return `<div class="case"><a onclick='tabClick("${topic}");' class = "anchorButton">
  <li class = "listOfTabs"><span class="tab">${topic}</span>
  </li></input type="file" class="fileInput"`
};

function loadVideos(topic){
  let videos = getVideos(topic);
  $("#videos").append(videos.map(htmlVideo));
}

function removeVideo(id) {
  deleteVideo(currentTopic, id);
  loadVideos(currentTopic);
}

function htmlVideo(id){
  return `<span class="file">${id}</span>`;
}

$(".anchorButton").click(function(){
  let selectedTab = $(this).addClass("selected").siblings().removeClass("selected");
});

function deleteConfirm(id) {
  let checksIfOKClicked;
  if (confirm("Are you sure you want to delete this video?") == true) {
    removeVideo(id);
  } else {

  }
}

function deleteConfirmTab(id) {
  let checksIfOKClicked;
  if (confirm("Are you sure you want to delete this tab? (Videos won't be saved.)") == true) {
    removeTab(id);
  } else {

  }
}

function HTMLoptionTab(nameOption) {
  return `<option class="option" value="${nameOption}">${nameOption}</option>`
}

function selectExistingTab() {
  let topicsVideos = getTopicsVideos();
  let size = Object.size(topicsVideos)
  for(let i=0;i<size;i++){
    var nameOption = (Object.keys(topicsVideos)[i]);
    var namekey = HTMLoptionTab(nameOption);
    $("#selectTopic").append(namekey);
  }
}


  $('select').on('change', function() {
    $("#topicInput").val( this.value );
  })


// console: ['0', '1', '2']
/*
1.ajax
2.node.js
3.google app engine
4.datastore
*/
