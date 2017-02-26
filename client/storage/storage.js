const ITEM_NAME = "topicsVideos"

function getTopicsVideos(){
  return JSON.parse(localStorage.getItem(ITEM_NAME)) || {}
}

function getVideos(topic){
  let topicsVideos = getTopicsVideos()
  return topicsVideos[topic] || []
}

function saveVideo(topic, video){
  let topicsVideos = getTopicsVideos()
  if (!topicsVideos.hasOwnProperty(topic)){
    topicsVideos[topic]=[]
  }
  topicsVideos[topic].push(video)
  saveTopicsVideos(topicsVideos)
}

function deleteVideo(topic, video){
  let topicsVideos = getTopicsVideos()
  let videos = topicsVideos[topic]
  let i = videos.indexOf(video)
  videos.splice(i,1)
  saveTopicsVideos(topicsVideos)
}

function deleteTopic(topic){
  let topicsVideos = getTopicsVideos();
  delete topicsVideos[topic];
  saveTopicsVideos(topicsVideos);
}

function saveTopicsVideos(topicsVideos){
  localStorage.setItem(ITEM_NAME, JSON.stringify(topicsVideos))
}
