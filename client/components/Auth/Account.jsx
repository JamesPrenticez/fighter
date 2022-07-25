import React from 'react'

import GenerateCharacter from './GenerateCharacter'

function Account({currentAccount}) {
  let {publicAddress, username, characters} = currentAccount
  console.log(characters[1])

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen'>
      <p className='text-white'>
        {JSON.stringify(currentAccount)}
      </p>


      <h1 className='text-7xl text-white text-center'>{username.toUpperCase()}</h1>

      <div className='flex justify-center mt-32'>
        <div className="flex max-w-5xl justify-between w-full">
          <div className='tranform scale-150'>
            <img className="" src="assets/portal.webp" alt="" />
            <h2 className='text-white font-medium text-center'>{characters[0].name ? `${characters[0].name}` : `Slot: ${characters[0].slot + 1}`}</h2>
            <h2>{characters[0].seed && `${characters[0].seed}` }</h2>
          </div>
          <div className='tranform scale-150'>
            <img className="" src="assets/portal.webp" alt="" />
            <h2 className='text-white font-medium text-center'>{characters[1].name ? `${characters[1].name}` : `Slot: ${characters[1].slot + 1}`}</h2>
            <h2>{characters[1].seed && `${characters[1].seed}` }</h2>
          </div>
          <div className='tranform scale-150'>
            <img className="" src="assets/portal.webp" alt="" />
            <h2 className='text-white font-medium text-center'>{characters[2].name ? `${characters[2].name}` : `Slot: ${characters[2].slot + 1}`}</h2>
            <h2>{characters[2].seed && `${characters[2].seed}` }</h2>
          </div>
        </div>
      </div>




      {/* <GenerateCharacter /> */}
    </div>
  )
}

export default Account