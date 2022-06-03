import React, {useState, useEffect, useRef} from 'react'
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux"
import { process } from "../../redux/encrypt/actions"
import {encrypt, decrypt} from "../../utlis/aes256"

function ChatRoom({ socket }) {
  const params = useParams()
  const dispatch = useDispatch()

  const chatBox = useRef(null);
  const bottomOfChatBox = useRef(null);
  
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([
    {userId: "5a4sdf65a4ds", username: "test", text: "the quick brown dog jumps over the slow black cat"},
    {userId: "asdfasda4sdf65a4ds", username: "prenticez", text: "oh wow the is very cool"}
  ])

  const roomname = params.roomname
  const username = params.username
  
  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher))
  }
  
  useEffect(() => {
    socket.on("message", (data) => {
      // decrypt messages recieved
      const answer = decrypt(data.text, data.username)
      dispatchProcess(false, answer, data.text)
      console.log('answer', answer)
      let temp = messages
      temp.push({
        userId: data.userId,
        username: data.username,
        text: answer,
      })
      setMessages([...temp])
    })
  }, [socket])

  const sendData = () => {
    if(text == "") return
    // encrypt messages sent
    const answer = encrypt(text)
    socket.emit("chat", answer)
    setText("")
  }

  // Scroll chat box to bottom
  
  //scroll ChatBox to bottom
  function scrollToBottom() {
    chatBox.current.scrollTo({top: chatBox.current.scrollHeight})
  }
  
  useEffect(scrollToBottom, [messages])


  // const scrollToBottom = () => {
  //   bottomOfChatBox.current.scrollIntoView({ behavior: "smooth" })
  // }

  // useEffect(scrollToBottom, [messages])

  return (
    <div className='bg-gray-50 h-full w-full'>
      {/* Header */}
      <div>
        <h1>Room: {roomname}</h1>
        <h2>Username: {username}</h2>
      </div>

      {/* Chat Box*/}
      <div 
        ref={chatBox}
        className='bg-white overflow-y-scroll w-full h-[500px]'
      >
        <div className='mt-[200px]'>hi</div>
        {messages.map((message, index) => {
          if(message.username === username){
            return (
              <div key={index} className="flex space-x-4">
                <span className='text-red-500 w-24 truncate'>{message.username}:</span>
                <p className='text-gray-700'>{message.text}</p>
              </div>
            )
          } else {
            return (
              <div key={index} className="flex space-x-4">
                <span className='text-green-500 w-24 truncate'>{message.username}:</span>
                <p className='text-gray-700' >{message.text}</p>
              </div>
            )
          }
        })}
        <div ref={bottomOfChatBox}>Bottom</div>
      </div>
      
      {/* Input Message*/}
      <div className='flex'>
        <input 
          type='text'
          className='w-full'
          placeholder='enter your message'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {if(e.key === "Enter"){ sendData()}}}
        />
        <button 
          className='text-center w-24 bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white'
          onClick={sendData}
        >
          Send
        </button>
      </div>

    </div>    
  )
}

export default ChatRoom