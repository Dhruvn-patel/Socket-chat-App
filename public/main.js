const chatfrom=document.getElementById('chat-form');
const chat_msg=document.querySelector('.chat-messages');
const room_name=document.getElementById('room-name');
const usersList=document.getElementById('users');
const leave_btn=document.getElementById('leave-btn');
const {username,room}=Qs.parse(location.search,{
  ignoreQueryPrefix:true
})
// console.log({username,room});

const socket=io();   
socket.emit('joinrooms',{username,room})

// get users and room
socket.on('roomDetails',({room,users})=>{
showRoom(room);
showUsers(users);
})
function showRoom(room)
{
 room_name.innerHTML=room;
}

function showUsers(users)
{
 
  usersList.innerHTML='';
  users.forEach(element => {
      const li=document.createElement('li');
      li.innerHTML=element.username;
      usersList.appendChild(li)
  });
  // console.log(users);
}


socket.on('message',(message)=>{
    console.log(message);
    chatmsgshow(message);

    chat_msg.scrollTop=chat_msg.scrollHeight;
})
function chatmsgshow(msg)
{
  var div=document.createElement('div');
  div.classList.add('message'); 
  div.innerHTML= `<p class="meta">${msg.username}<span> ${msg.time}</span></p>
  <p class="text"> ${msg.text}</p>`
  const parentNode=document.querySelector('.chat-messages');
  parentNode.appendChild(div)   
}

chatfrom.addEventListener('submit',(e)=>{
    // console.log(e.target.elements.msg.value);
    e.preventDefault();
    const msg=e.target.elements.msg.value;
   //emit msg to server
    socket.emit('chatmsg',msg);

    e.target.elements.msg.value="";
    e.target.elements.msg.focus();
})

leave_btn.addEventListener('click',()=>{
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = 'index.html';
  } 
})