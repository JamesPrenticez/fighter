import React, {useEffect, useState} from 'react'
import Spinner from '../Common/Spinner'
import {TickIcon, CrossIcon} from '../Common/Icons'

function CreateAccount({socket, publicAddress, checkIfPublicAddressIsStoredInDatabase, currentAccount, setCurrentAccount}){
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [usernameTaken, setUsernameTaken] = useState(null)

  const isUsernameTaken = (username) => {
    if(!username) return setUsernameTaken(true)
    setLoading(true)
    socket.emit("isUsernameTaken", {username: username})

  }
  
  const register = (e) => {
    e.preventDefault()
    socket.emit("createNewAccount", {publicAddress: publicAddress, username: username})
  }


  //Listen for isUsernameTaken response
  socket.on('isUsernameTakenResponse', (data) => {
    //intentional delay so we can see the spinner
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    setUsernameTaken(data.success)
  })

  //Listen for createNewAccount response
  socket.on('createNewAccountResponse', (data) => {
    console.log(data.success)
    if(data.success){
      checkIfPublicAddressIsStoredInDatabase(publicAddress)
    } else {
      setCurrentAccount({success: false})
    }
  })
  
  useEffect(() => {setUsernameTaken(null)}, [username])

  return (
    <div className='flex flex-col w-full items-center p-6 h-[50vh]'>

      <div className='border p-6 rounded-sm bg-white shadow-md'>

        <h1 className='text-2xl font-bold'>Create Account</h1>

        <h2 className='text-lg w-1/2 font-medium'>Public Address: </h2>
        <p>{publicAddress}</p>

        <div className='flex mt-2 space-x-2 w-full'>
              <input 
                type='text'
                className="inputField"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => {if(e.key === "Enter"){isUsernameTaken}}}
              />            
            <button 
              className='flex items-center justify-center text-sm text-center rounded-sm w-[4rem] h-full p-2  hover:cursor-pointer'
              onClick={() => isUsernameTaken(username)}
            >
              {
                loading ? <Spinner className="h-6 w-6"  />
                : usernameTaken == true ? <CrossIcon className="h-6 w-6 text-red-500"  />
                : usernameTaken == false ? <TickIcon className="h-6 w-6 text-green-500"  />
                : "Check"
              } 
            </button>
        </div>
        <button 
            className="text-white mt-4 w-full p-1 bg-gradient-to-r from-yellow-400 to-red-600 font-bold rounded transform transition-all hover:scale-105 ease-out"
            onClick={register}
        >
          Create Account
        </button>
      </div>


      <h1>Account Created?</h1>
      { currentAccount.success == true ? <TickIcon className="h-6 w-6 text-green-500"/> : <CrossIcon className="h-6 w-6 text-red-500" />} 

    </div>
  )
}

export default CreateAccount