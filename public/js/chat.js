const socket = io()

const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true});
const $messages = document.querySelector('#messages').innerHTML



const autoscroll = () => {
    // New message element
    const newMessage = document.querySelector('#messages').innerHTML.lastElementChild
    // Height of the new message
    const newMessageStyles = getComputedStyle(newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = document.querySelector('#messages').innerHTML.offsetHeight

    // Height of messages container
    const containerHeight = document.querySelector('#messages').innerHTML.scrollHeight

    // How far have I scrolled?
    const scrollOffset = document.querySelector('#messages').innerHTML.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        document.querySelector('#messages').innerHTML.scrollTop = document.querySelector('#messages').innerHTML.scrollHeight
    }
}


socket.on('message',(message)=>{
    console.log(message)
    let html = Mustache.render(messageTemplate,
        {
            username:message.username ,
            message:message.text,
            createdAt:moment(message.createdAt).format('h:mm a')
        })
    document.querySelector('#messages').insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('locationMessage',(message)=>{
    let html = Mustache.render(locationTemplate,
        {
            username:message.username ,
            url:message.url , 
            createdAt :moment(message.createdAt).format('h:mm a')
        });
    document.querySelector('#messages').insertAdjacentHTML('beforeend',html);
    autoscroll()
})

document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    let message= document.querySelector('#msg').value;
    document.querySelector('#msgbtn').setAttribute('disabled','disabled')

    socket.emit('chatMessage',message,(error)=>{
      document.querySelector('#msgbtn').removeAttribute('disabled')
      document.querySelector('#msg').value = '';
      document.querySelector('#msg').focus();
        if(error){
            return console.log(error);
        }
        console.log("message dileverd")
    });
})

document.querySelector('#send-location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert("Not supported Navigator")
    }
    document.querySelector('#send-location').setAttribute('disabled','disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },()=>{
            document.querySelector("#send-location").removeAttribute('disabled');
            console.log("Shared")
        })
    })
})

socket.on('roomData',({room,users})=>{
    const html = Mustache.render(sidebarTemplate,{
        room , 
        users
    })
    document.querySelector('#sidebar').innerHTML = html
    
})
socket.emit('join',{username,room},(error)=>{
    if(error) {
        alert(error)
        location.href='/'
    }
})