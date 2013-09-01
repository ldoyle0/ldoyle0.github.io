var express = require('express');
var fs = require('fs');
var buf = require('buffer')

var app = express.createServer(express.logger());
var output = fs.readFileSync('index.html').toString(); 

app.get('/', function(request, response) {
    response.send(output);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});					


 				
