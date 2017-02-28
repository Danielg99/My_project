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
  return `<div class="case"><a onclick='tabClick("${topic}");' class = "anchorButton">
  <li class = "listOfTabs"><span class="tab">${topic}</span>
  </li></a><div class="dragandrophandler">Drag & Drop Files Here</div>
  <br><br>
  <div id="status1"></div></div>`;
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

// start uploading file
function sendFileToServer(formData,status)
{
    var uploadURL ="http://hayageek.com/examples/jquery/drag-drop-file-upload/upload.php"; //Upload URL
    var extraData ={}; //Extra Data.
    var jqXHR=$.ajax({
            xhr: function() {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        //Set progress
                        status.setProgress(percent);
                    }, false);
                }
            return xhrobj;
        },
    url: uploadURL,
    type: "POST",
    contentType:false,
    processData: false,
        cache: false,
        data: formData,
        success: function(data){
            status.setProgress(100);

            $("#status1").append("File upload Done<br>");
        }
    });

    status.setAbort(jqXHR);
}

var rowCount=0;
function createStatusbar(obj)
{
     rowCount++;
     var row="odd";
     if(rowCount %2 ==0) row ="even";
     this.statusbar = $("<div class='statusbar "+row+"'></div>");
     this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
     this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
     this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
     this.abort = $("<div class='abort'>Abort</div>").appendTo(this.statusbar);
     obj.after(this.statusbar);

    this.setFileNameSize = function(name,size)
    {
        var sizeStr="";
        var sizeKB = size/1024;
        if(parseInt(sizeKB) > 1024)
        {
            var sizeMB = sizeKB/1024;
            sizeStr = sizeMB.toFixed(2)+" MB";
        }
        else
        {
            sizeStr = sizeKB.toFixed(2)+" KB";
        }

        this.filename.html(name);
        this.size.html(sizeStr);
    }
    this.setProgress = function(progress)
    {
        var progressBarWidth =progress*this.progressBar.width()/ 100;
        this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
        if(parseInt(progress) >= 100)
        {
            this.abort.hide();
        }
    }
    this.setAbort = function(jqxhr)
    {
        var sb = this.statusbar;
        this.abort.click(function()
        {
            jqxhr.abort();
            sb.hide();
        });
    }
}
function handleFileUpload(files,obj)
{
   for (var i = 0; i < files.length; i++)
   {
        var fd = new FormData();
        fd.append('file', files[i]);

        var status = new createStatusbar(obj); //Using this we can set progress.
        status.setFileNameSize(files[i].name,files[i].size);
        sendFileToServer(fd,status);

   }
}
$(document).ready(function()
{
var obj = $(".dragandrophandler");
obj.on('dragenter', function (e)
{
    e.stopPropagation();
    e.preventDefault();
    $(this).css('border', '2px solid #0B85A1');
});
obj.on('dragover', function (e)
{
     e.stopPropagation();
     e.preventDefault();
});
obj.on('drop', function (e)
{

     $(this).css('border', '2px dotted #0B85A1');
     e.preventDefault();
     var files = e.originalEvent.dataTransfer.files;

     //We need to send dropped files to Server
     handleFileUpload(files,obj);
});
$(document).on('dragenter', function (e)
{
    e.stopPropagation();
    e.preventDefault();
});
$(document).on('dragover', function (e)
{
  e.stopPropagation();
  e.preventDefault();
  obj.css('border', '2px dotted #0B85A1');
});
$(document).on('drop', function (e)
{
    e.stopPropagation();
    e.preventDefault();
});

});
//end uploading file
// console: ['0', '1', '2']
/*
1.ajax
2.node.js
3.google app engine
4.datastore
*/
