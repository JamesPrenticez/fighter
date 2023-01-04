import React, { useRef, useEffect, useState } from 'react'
// ====================================================================================== 
//  Canvas 
// ====================================================================================== 
import {mainDraw} from './mainDraw'
import { movement } from './movement'

const Canvas = props => {
    const { socket, id } = props
    const canvasRef = useRef(null)

    useEffect(() => {
      // Context
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let frameCount = 0
      let animationFrameId

      const render = () => {
        frameCount++
        resizeCanvasToDisplaySize(canvas)
        mainDraw(socket, ctx, frameCount)
        movement(socket, canvas)
        animationFrameId = window.requestAnimationFrame(render)
      }

      render()
      
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }, [mainDraw])
  
  return <canvas id={id} ref={canvasRef} tabIndex={0} className="ring-2 ring-red-500 focus:ring-green-500 select-none box-border rounded-md outline-none hidden"/>
}

export default Canvas

// ====================================================================================== 
// Resize 
// ====================================================================================== 
function resizeCanvasToDisplaySize(canvas) {
    
  const width = 500 //window.innerWidth - 100
  const height = 500 //window.innerHeight - 100

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio:ratio=1 } = window
    const context = canvas.getContext('2d')
    canvas.width = width*ratio
    canvas.height = height*ratio
    context.scale(ratio, ratio)
    return true
  }

  return false
}