import React from 'react'
import { BrowserRouter, Routes , Route} from "react-router-dom";
import io from "socket.io-client"

import Home from './Home'

import ConnectWallet from './Auth/ConnectWallet'

import ChatRoom from './Chat/ChatRoom';
import ChatRoomList from './Chat/ChatRoomList';

import Game from './Game/Game';
import GenerateCharacter from './Game/GenerateCharacter';

export default function App() {
  const socket = io.connect('/')

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<Home/>} /> */}
          <Route exact path="/" element={<ConnectWallet socket={socket}/>} />
          <Route exact path="/chat-room-list" element={<ChatRoomList socket={socket}/>} />
          <Route exact path="/chat/:roomname/:username" element={<ChatRoom socket={socket}/>} />
          <Route exact path="/char" element={<GenerateCharacter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}