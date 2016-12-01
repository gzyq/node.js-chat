/*
 *chat by gzyq
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
        var sendBtn = document.getElementById("sendBtn"),
            chatMess = document.getElementById('chatMess');
        this.socket = io.connect();
        this.socket.on('connect',function(){
            var li = document.createElement("li");
            li.innerHTML = '欢迎进入直播间···';
            document.getElementById('chatListUl').appendChild(li);
            chatMess.focus();
        });
        this.socket.on('chatNewMsg',function(name,msg){
            that.sendNewMsg(name,msg,'city0');
        });

        sendBtn.addEventListener('click',function(){
            var msg = chatMess.value;
            console.log(msg);
            that.socket.emit('sendMsg',msg);
            that.sendNewMsg('自己',msg,'city1');
        },false);

        chatMess.addEventListener('input', function(){
            that.textareaChange();
        },false);
        chatMess.addEventListener('propertychange', function(){
            that.textareaChange();
        },false);  
    },
    /*  发送消息至聊天列表
        name:username
        msg :message
        usr :different color of identity
     */
    sendNewMsg:function(name,msg,usr){
        var chatListUl =  document.getElementById('chatListUl'),
            li = document.createElement("li");
            li.innerHTML = '<span class="'+usr+'">'+name+'</span><span class="comments">'+msg+'</span>';
        chatListUl.appendChild(li);
    },
    /*发送按钮 颜色变换*/
    textareaChange:function(){
        var word = chatMess.value;
        if(word.replace(/\s+/g, "").length !=0){
            sendBtn.style.cssText ='background-color:#15aaef;color:#FFF;';
        }else{
            sendBtn.style.cssText= '';
        }   
    }

};
