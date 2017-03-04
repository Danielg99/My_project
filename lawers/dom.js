
let currentTopic;
loadTopics();
selectExistingTab();

$('#form').submit((e)=>{
  e.preventDefault();
  let topicValue = $("#topicInput").val().toUpperCase();
  let videoValue = $("#videoInput").val();
  saveVideo(topicValue, videoValue);
  loadTopics();
  loadVideos(topicValue);
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
  return `<div class="case">
  <li class = "listOfTabs"><span class="tab">${topic}</span>
  </li><input type="file" class="fileInput"></div>`;
};

function loadVideos(topic){
  let videos = getVideos(topic);
  $("#videos").append(videos.map(htmlVideo));
}

function fileHTML(name){
  return `<span class="fileName">${name}</span>`
}

function removeVideo(id) {
  deleteVideo(currentTopic, id);
  loadVideos(currentTopic);
}

function htmlVideo(id){
  return `<span class="tab"></span>`;
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

$('.fileInput').change(function () {
  let nameFile = this.value.replace(/C:\\fakepath\\/i, ', ');
  let getFiles = getFilesNames();
  let files = saveFiles(nameFile);
  $(".case").append(fileHTML(nameFile));
});

let fileNames = getFilesNames();
$(".case").append(getFilesNames);