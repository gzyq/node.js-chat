var express = require('express'), //引入express模块
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server); //引入socket.io模块并绑定到服务器

app.use('/', express.static(__dirname + '/www')); //指定静态HTML文件的位置
server.listen(80);
console.log('server started');

var usrs=[];


//socket部分
io.on('connection', function(socket) {

	socket.on('enter',function(getName){
		if(usrs.indexOf(getName) > -1){
			socket.emit('nameExisted');
		}else {	
			socket.usrNum = usrs.length ;
			socket.getName = getName ;
			usrs.push(getName); 
			console.log('在线参与人数：'+usrs.length);
			console.log('在线参与名单：'+usrs);
			socket.emit('enterOk');
			io.sockets.emit('systemMsg', getName, usrs.length,'join');
			//socket.broadcast.emit('systemMsg', getName, usrs.length,'join');
		}	
	});

    socket.on('sendMsg',function(name,msg){
    	socket.broadcast.emit('chatNewMsg',name,msg);
    });

    socket.on('disconnect',function(){
    	 //将断开连接的用户从usrs中删除
	    usrs.splice(socket.usrNum, 1);
	    console.log('离开人  '+socket.getName);
    	socket.broadcast.emit('systemMsg',socket.getName,usrs.length,'exit');
    });
});