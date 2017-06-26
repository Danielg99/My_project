const express = require('express');
const app = express();
const route = 8080;

app.use(express.static('client'))

app.post("/", function(req, res) {
  let body = "";
  req.on("data", function(data) {
    body += data
  })
  req.on(`end`, function(){
    let jsObject = JSON.parse(body)
    console.log(jsObject.userName)
    console.log(typeof(jsObject));
    res.end("ok")
  })
})

app.listen(8080,function() {
  console.log("server running on 8080")
})
