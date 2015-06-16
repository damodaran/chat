var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
  res.sendfile('index.html');
});
io.on('connection', function(socket){
  console.log('New client is connected to the server');
  socket.on('sendMsg', function(msg){
    console.log('message: ' + msg);
    io.emit('getMsg', msg);
  });
  socket.on("login",function(name) {
    io.emit('newUser', name);
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});