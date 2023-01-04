import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes , Route} from "react-router-dom";
import io from "socket.io-client"

import Auth from './Auth/Auth'
import ChatRoom from './Chat/ChatRoom';
import ChatRoomList from './Chat/ChatRoomList';

export default function App() {
  const socket = io()

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