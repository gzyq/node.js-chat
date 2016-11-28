var express = require('express'), //引入express模块
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server); //引入socket.io模块并绑定到服务器

app.use('/', express.static(__dirname + '/www')); //指定静态HTML文件的位置
server.listen(80);
console.log('server started');

//socket部分
io.on('connection', function(socket) {
    socket.on('sendMsg',function(msg){
    	socket.broadcast.emit('chatNewMsg','游客',msg);
    });
});