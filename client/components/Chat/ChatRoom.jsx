import React from 'react'

import { useParams } from "react-router-dom";



function ChatRoom({ socket }) {
  
  const params = useParams()
  const roomname = params.roomname
  const username = params.username
  
  return (
    <div className='bg-red-500 h-full w-full'>
      <p>Room: {roomname}</p>
      <p>Username: {username}</p>
    </div>
  )
}

export default ChatRoom