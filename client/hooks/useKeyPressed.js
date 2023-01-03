import React, { useEffect, useState } from 'react'

export const useKeyPressed = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const handleKeyDown = (e) => {
    console.log(e.key)
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
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  })
  return keyPressed
}
