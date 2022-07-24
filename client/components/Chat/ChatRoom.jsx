import React, {useState, useEffect, useRef} from 'react'
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux"
import { process } from "../../redux/encrypt/actions"
import {encrypt, decrypt} from "../../utils/aes256"
import Layout from '../Layout';

function ChatRoom({ socket }) {
  const params = useParams()
  const dispatch = useDispatch()

  const chatBox = useRef(null);
  const bottomOfChatBox = useRef(null);
  
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])

  const roomname = params.roomname
  const username = params.username
  
  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher))
  }
  
  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data)
      // decrypt messages recieved
      const answer = decrypt(data.text, data.username)
      dispatchProcess(false, answer, data.text)
      let temp = messages
      temp.push({
        userId: data.userId,
        username: data.username,
        text: answer,
        color: data.color
      })
      setMessages([...temp])
    })
  }, [socket])

  const sendData = () => {
    if(text == "") return
    // encrypt messages sent
    const cypher = encrypt(text)
    socket.emit("sendMessage", cypher)
    setText("")
  }

  const scrollToBottom = () => {
    bottomOfChatBox.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  return (
    <Layout>
      <div className='bg-gray-50 h-full w-full md:w-1/2'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold'>Room: {roomname}</h1>
        </div>

        {/* Chat Box*/}
        <div 
          ref={chatBox}
          className='bg-white overflow-y-scroll overflow-x-hidden no-scrollbar-x w-full h-32 flex flex-col rounded-sm ring-1 ring-gray-300 p-2'
        >
          <div className='mt-auto font-bold flex whitespace-nowrap'>
              <p>Welcome To the Chat!</p>
          </div>

          {messages.map((message, index) => {
            if(message.username === username){
              return (
                <div key={index} className="flex space-x-4">
                  <span className='text-blue-700  min-w-[4rem] w-full max-w-[4rem]'>{message.username}:</span>
                  <p className='text-blue-700 whitespace-nowrap text-clip overflow-x-scroll no-scrollbar-x'>{message.text}</p>
                </div>
              )
            } else {
              return (
                <div key={index} className="flex space-x-4">
                  <span className='min-w-[4rem] w-full max-w-[4rem]' style={{color: message.color}}>{message.username}:</span>
                  <p className="whitespace-nowrap text-clip overflow-x-scroll no-scrollbar-x" style={{color: message.color}}>{message.text}</p>
                </div>
              )
            }
          })}
          <div ref={bottomOfChatBox}></div>
        </div>
        
        {/* Input Message*/}
        <div className='flex mt-2 space-x-2'>
          <span
            className="bg-white text-blue-700 flex w-full p-2 ring-1 ring-blue-900 focus:ring-blue-500 outline-none rounded-sm whitespace-nowrap truncate"
            >
            {username}: &nbsp;
            <input 
              type='text'
              className="flex grow outline-none "
              placeholder='Enter your message...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => {if(e.key === "Enter"){sendData()}}}
            />            
          </span>
          <button 
            className='text-center rounded-sm w-24 h-full p-2 ring-blue-600 ring-1 bg-blue-700 hover:bg-blue-600 hover:cursor-pointer text-white'
            onClick={sendData}
          >
            Send
          </button>
        </div>

      </div>    
    </Layout>

  )
}

export default ChatRoom