import React, {useRef} from 'react'
import { io } from 'socket.io-client'


export default function Chat(){
  let socket = io()
  const chatBox = useRef()

  //scroll ChatBox to bottom
  function scrollToBottom() {
    console.log("here")
    let isScrolledToBottom = chatBox.scrollHeight - chatBox.clientHeight <= chatBox.scrollTop + 1
    if (!isScrolledToBottom) {
      chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
    }
  }

  //sendMessage
  onsubmit = (event) => {
    event.preventDefault()
    if (event.target.value[0] === "/") {
      socket.emit("sendCommand", event.target.value.slice(1))
    } else {
      socket.emit("sendMessage", event.target.value)
    }
    event.target.value = ""; //reset to blank
  }

  const add = (event) => {
    console.log(" here")
    console.log(chatBox)
    event.preventDefault()
    //chatBox.innerHTML = "hi"
  }

  //recieveMessage
  socket.on("recieveMessage", (data) => {
    chatBox.innerHTML += "<p>" + data + "</p>"
    scrollToBottom()
  })

  //recieveCommands
  socket.on("recieveCommand", (result) => {
    chatBox.innerHTML += "<p style='color: red'>" + result + "</p>";
    scrollToBottom()
  })
  


  return (
    <div className="w-[500px] h-[200px]">
      <div id="chat-box" ref={chatBox} className="bg-gray-300/80 overflow-y-scroll w-full h-full" onChange={scrollToBottom}>
        <p>Welcome to the Sand Casino!</p>
      </div>

      <form id="chat-form" action="" className="relative bg-yellow-100 w-full inline-flex rounded-sm">
        <input id="chat-input" type="text" className="w-[80%] focus:outline-none" placeholder="Enter your message ..." />
        <button id="chat-button" type="submit" className="flex items-center justify-center w-[20%] bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white">Send</button>
        <button className="flex items-center justify-center w-[20%] bg-pink-500 hover:bg-pink-600 hover:cursor-pointer text-white" onClick={() => add(event)}>
          test
        </button>
      </form>
    </div>
  )
}