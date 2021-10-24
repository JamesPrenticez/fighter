let chatBox = document.getElementById("chat-box")
let chatForm = document.getElementById("chat-form")
let chatInput = document.getElementById("chat-input")

// socket.on("addToChat"), function(data){
//     chatBox.innerHTML += "<div>" + data + "</div>"
// }

//socket.emit("sendMsgToServer", "world");

socket.on("sendMessage", (data) => {
    console.log(data)
    chatBox.innerHTML += "<div>" + data + "</div>"
  });

chatForm.onsubmit = (event) => {
    event.preventDefault()
    socket.emit("sendMessage", chatInput.value)
    chatInput.value = "" //reset to nothing
}

