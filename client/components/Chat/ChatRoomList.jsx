import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../Layout"

const rooms = [
  {name: "Room 1", slug: "1"},
  {name: "Room 2", slug: "2"},
  {name: "Room 3", slug: "3"},
]

function ChatRoomList({socket}) {
  const navigate = useNavigate();
  const [username, setusername] = useState("prenticez")

  const sendData = (roomname) => {
    if(!username) {
      alert("please enter a username")
      return
    }
    socket.emit("joinRoom", {username, roomname})
    navigate(`/chat/${roomname}/${username}`)
  }

  return (
    <Layout>
        <h1 className="text-3xl font-bold w-full text-center">ChatRoomList</h1>

      <div className="mx-auto flex flex-wrap bg-white border rounded-md w-1/2 p-12">

        <label className="flex items-center space-x-4 w-full " htmlFor="username" >
          <p className="text-lg font-medium">Enter Username:</p>
          <input
            className="p-1 rounded-sm ring-1 ring-gray-300 focus:ring-orange-500 outline-none"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </label>

        <div className="flex flex-wrap justify-center w-full space-y-4 mt-4 font-bold">
          {rooms.map((room) => (
              <button 
                key={room.name}
                className="w-full bg-orange-500 hover:bg-orange-400 cursor-pointer transform hover:scale-105 ease-in-out p-6 rounded-md font-bold text-white " 
                onClick={() => sendData(room.slug)}
              >
                {room.name}
              </button>
          ))}
        </div>
      </div>

    </Layout>
  )
}

export default ChatRoomList