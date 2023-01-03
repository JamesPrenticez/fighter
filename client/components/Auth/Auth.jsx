import React, {useState} from 'react'
import { useEffect } from 'react';
import Canvas from '../Game/Canvas';

import Layout from '../Layout'

export default function Auth({socket}) {
  let authContainer = document.getElementById("auth-container");
  // let usernameInput = document.getElementById("username");
  // let passwordInput = document.getElementById("password");
  let registerButton = document.getElementById("register");
  let loginButton = document.getElementById("login");
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const login = async (e) => {
    e.preventDefault();
    socket.emit("login", {username: username, password: password})
    await socket.on('loginResponse', (data) => {
      if(data.success){
        authContainer.style.display = "none"
        canvas.style.display = "inline-block"
        alert(`You are now signed in as ${username}`)
      } else {
        alert("Sign in unsuccessful")
      }
    })
  }

  const register = () => {
    loginButton.onclick = (event) => {
  event.preventDefault();
  socket.emit("login", {username: username.value, password: passwordInput.value})
}
  }

  useEffect(() => {
    socket.on('loginResponse', (data) => {
      if(data.success){
        authContainer.style.display = "none"
        canvas.style.display = "inline-block"
      } else {
        alert("Sign in unsuccessful")
      }
    })
  })

  return (
    <Layout>
        <main className="flex justify-center">
          <div className="flex-col">
            
            <div id="auth-container" className="flex justify-between w-[500px] h-[200px]">
              <img className="h-full w-[50%]" src="./assets/camel.png" alt="camel" />

              <form 
                id="auth-form"
                action=""
                className="flex-col w-full bg-yellow-300 p-3"
              >
              
                <b>Username:</b>
                <input 
                  id="username"
                  type="text"
                  value={username}
                  placeholder="Username"
                  className="w-full focus:outline-none"
                  onChange={(e) => setUsername(e.target.value)}  
                />
                
                <b>Password:</b>
                <input 
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  className="w-full focus:outline-none"
                  onChange={(e) => setPassword(e.target.value)}   
                />
                
                <div className="flex w-full pt-3">
                  <div
                    id="register"
                    onClick={() => register()}
                    className="flex items-center justify-center w-[50%] bg-orange-500 hover:bg-orange-600 hover:cursor-pointer text-white"
                  >
                    Register
                  </div>
                  
                  <button 
                    type="submit"
                    id="login"
                    onClick={(e) => login(e)}
                    className="flex items-center justify-center w-[50%] bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white"
                  >
                    Login
                </button>
                </div>
              </form>
            </div>

            <div className="flex w-full space-x-3">
              <p className="ml-auto" id="clientX"></p>
              <p id="clientY"></p>
            </div>

            <Canvas 
              id="canvas"
              socket={socket}
              width="500"
              height="500"
              className="border-2 border-gray-600 select-none box-border hidden"
            />
            
          </div>
        </main>

    </Layout>
  )
}