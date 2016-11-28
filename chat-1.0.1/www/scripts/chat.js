/*
 *chat
 */
window.onload = function() {
    var chat = new Chat();
    chat.init();
};
var Chat = function() {
    this.socket = null;
};
Chat.prototype = {
    init: function() {
        var that = this;
        this.socket = io.connect();
        this.socket.on('connect',function(){
            var li = document.createElement("li");
            li.innerHTML = '欢迎进入直播间···';
            document.getElementById('chatListUl').appendChild(li);
            document.getElementById('chatMess').focus();
        });
        this.socket.on('chatNewMsg',function(usr,msg){
            var li = document.createElement("li");
            li.innerHTML = usr+' '+msg;
            document.getElementById('chatListUl').appendChild(li);
        });

       document.getElementById("sendBtn").addEventListener('click',function(){
            var msg = document.getElementById('chatMess').value;
            console.log(msg);

            that.socket.emit('sendMsg',msg);

            var li = document.createElement("li");
            li.innerHTML = '自己'+' '+msg;
            document.getElementById('chatListUl').appendChild(li);

       },false);
    },
};
