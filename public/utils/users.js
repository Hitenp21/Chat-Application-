const users = [];

const addUser = ({id,username,room}) =>{
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(!username && !room){
        return {
            error: 'Username and room are required.'
        }
    }

    const existingUser = users.find((user)=>{
        return user.username === username && user.room === room;
    })

    if(existingUser){
        return {
            error:"This username is already use!"
        }
    }

    const user = {id , username, room};
    users.push(user);
    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex(((user) => user.id===id));

    if(index!==-1){
        return users.splice(index,1)[0];
    }
}

const getUser = (id)=>{
    return users.find((user)=>user.id ===id)
}

const getUserInRoom = (room) =>{
    room = room.trim().toLowerCase();
    return users.filter((user)=>user.room ===room)
}

module.exports = {addUser ,removeUser , getUser , getUserInRoom}