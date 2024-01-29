export default function (socket) {
    


    //user joins or opens the application
    //join event from socket
    socket.on("join",(user)=>{
        console.log("userhas joined", user);
        socket.join(user);
    })

//join  a conversation room
socket.on("join conversation",(conversation)=>{
    socket.join(conversation);
    console.log("user has jointed the conversatuion ", conversation);
})


//send and receive message
socket.on("send message", (message)=>{
    // console.log("-----> new message receiver ----> ", message);
    let conversation = message.conversation;
    if(!conversation.users)return;
    conversation.users.forEach((user)=>{
        if(user._id===message.sender._id)return;
        //socket
        socket.in(user._id).emit("receive message", message);
    })
})

}