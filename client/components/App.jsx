import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes , Route} from "react-router-dom";
import io from "socket.io-client"

import Auth from './Auth/Auth'
import ChatRoom from './Chat/ChatRoom';
import ChatRoomList from './Chat/ChatRoomList';

export default function App() {
  const socket = io()
  const [isConnected, setIsConnected] = useState(socket.connected)
  
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
      console.log(socket.id)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('pong', () => {
      setLastPong(new Date().toISOString())
    });

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Auth socket={socket}/>} />
          <Route exact path="/chat-room-list" element={<ChatRoomList socket={socket}/>} />
          <Route exact path="/chat/:roomname/:username" element={<ChatRoom socket={socket}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}