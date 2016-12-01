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
        var that = this,
            sendBtn = document.getElementById("sendBtn"),
            chatMess = document.getElementById('chatMess'),
            joinNum = document.getElementById('joinNum'),
            name = document.getElementById('account'),
            loginError = document.getElementById('loginError'),
            enter = document.getElementById('enter'),
            loginLayer = document.getElementsByClassName('loginLayer')[0];

        this.socket = io.connect();
        this.socket.on('connect',function(){
            name.focus();
        });
        this.socket.on('nameExisted',function(){
            loginError.innerHTML = "该昵称已存在，请重新输入！";
            name.value = '';
            name.focus();
        });
        this.socket.on('enterOk',function(){
            loginLayer.style.display = 'none';
        });
        this.socket.on('systemMsg',function(getName,num,status){
            joinNum.innerHTML = '参与人数：'+ num +'人'; 
          //status =  status == 'join'?'加入': '退出'; 
            var li = document.createElement("li");
            li.innerHTML = getName + (status == 'join'?'加入': '退出')+'聊天';
            console.log(getName + (status == 'join'?'加入': '退出')+'聊天 '+new Date()+' '+num);
            document.getElementById('chatListUl').appendChild(li);
        });

        this.socket.on('chatNewMsg',function(name,msg){
            that.sendNewMsg(name,msg,'city1');
        });

        enter.addEventListener('click',function(){
            var getName = name.value;
            console.log(getName);
            if(getName.trim().length == 0){
                loginError.innerHTML = "昵称不能为空！";
                name.focus();
                return false;
            };
            that.socket.emit('enter',getName);
        },false);

        sendBtn.addEventListener('click',function(){
            var msg = chatMess.value;
            console.log(msg);
            that.socket.emit('sendMsg',name.value,msg);
            that.sendNewMsg( name.value,msg,'city0');
            chatMess.value='';
        },false);

        name.addEventListener('input', function(){
            that.nameInputChange();
        },false);
        name.addEventListener('propertychange', function(){
            that.nameInputChange();
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
    systemRemind:function(){

    },
    /*有错误提示时，再次输入昵称时，提示消失*/
    nameInputChange:function(){
       loginError.innerHTML = "";
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
