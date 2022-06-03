import React from 'react'

import Layout from './Layout'

export default function Home() {
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
                  placeholder="Username"
                  className="w-full focus:outline-none"  
                />
                
                <b>Password:</b>
                <input 
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full focus:outline-none" 
                />
                
                <div className="flex w-full pt-3">
                  <div
                    id="register"
                    onclick="register()"
                    className="flex items-center justify-center w-[50%] bg-orange-500 hover:bg-orange-600 hover:cursor-pointer text-white"
                  >
                    Register
                  </div>
                  
                  <button 
                    id="login"
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

            <canvas 
              id="canvas"
              width="500"
              height="500"
              className="border-2 border-gray-600 select-none box-border hidden"
            >
            </canvas>
            
          </div>
        </main>

    </Layout>
  )
}