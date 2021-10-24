let chatBox = document.getElementById("chat-box")
let chatForm = document.getElementById("chat-form")
let chatInput = document.getElementById("chat-input")

//Scroll ChatBox to bottom
function scrollToBottom(){
    var isScrolledToBottom = chatBox.scrollHeight - chatBox.clientHeight <= chatBox.scrollTop + 1;
    if(!isScrolledToBottom){
        chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight
    }
}
//recieveMessage
socket.on("recieveMessage", (data) => {
    chatBox.innerHTML += "<p>" + data + "</p>"
    scrollToBottom()
  });

  //sendMessage
chatForm.onsubmit = (event) => {
    event.preventDefault()
    socket.emit("sendMessage", chatInput.value)
    chatInput.value = "" //reset to nothing
}