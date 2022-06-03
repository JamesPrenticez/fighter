import React from 'react'
import { BrowserRouter, Routes , Route} from "react-router-dom";
import io from "socket.io-client"

import ChatRoom from './Chat/ChatRoom';
import ChatRoomList from './Chat/ChatRoomList';
import Home from './Home'

export default function App() {
  const socket = io.connect('/')

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<Home/>} /> */}
          <Route exact path="/" element={<ChatRoomList socket={socket}/>} />
          <Route exact path="/chat/:roomname/:username" element={<ChatRoom socket={socket}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}