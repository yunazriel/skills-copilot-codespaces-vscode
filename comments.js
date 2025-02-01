// Create web server
var express = require('express');
var app = express();
// Create web server
var server = require('http').createServer(app);
// Create socket.io server
var io = require('socket.io').listen(server);
// Create a comments array
var comments = [];
// Set the port to 3000
server.listen(3000);
// Set up the web server to serve static files from the public directory
app.use(express.static(__dirname + '/public'));
// Send comments array to the client
app.get('/comments', function(req, res) {
  res.json(comments);
});
// When a new comment is received...
io.sockets.on('connection', function(socket) {
  socket.on('send comment', function(data) {
    comments.push(data);
    io.sockets.emit('comments', comments);
  });
});