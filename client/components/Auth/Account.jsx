import React from 'react'

function Account({currentAccount}) {

  return (
    <div>
      <h1>Account Settings</h1>
      {JSON.stringify(currentAccount)}
    </div>
  )
}

export default Account