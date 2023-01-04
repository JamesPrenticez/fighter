import React, { useEffect, useState } from 'react'


// Target location is cavas but can otherwise just be "window"
export const useKeyPressed = (targetKey, targetLocation) => {
  if(!targetLocation) return
  const [keyPressed, setKeyPressed] = useState(false)
  const handleKeyDown = (e) => {
    console.log(e.key == targetKey?(targetKey, targetLocation):false)
    if (e.repeat) return
    if (e.key === 'ArrowUp') e.preventDefault()
    if (e.key === targetKey) {
      e.preventDefault()
      setKeyPressed(true)
    }
  }

  const handleKeyUp = (e) => {
    e.preventDefault()
    e.key === targetKey && setKeyPressed(false)
  }


  useEffect(() => {
    targetLocation.addEventListener('keydown', handleKeyDown)
    targetLocation.addEventListener('keyup', handleKeyUp)

    return () => {
      targetLocation.removeEventListener('keydown', handleKeyDown)
      targetLocation.removeEventListener('keyup', handleKeyUp)
    }
  })
  return keyPressed
}
