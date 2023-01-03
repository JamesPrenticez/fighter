import React, { useRef, useEffect } from 'react'

// ====================================================================================== 
//  Canvas 
// ====================================================================================== 
import {draw} from './draw'
import {movement} from './movement'

const Canvas = props => {
  
  const { socket, id } = props

  const canvasRef = useRef(null)
  useEffect(() => {
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      resizeCanvasToDisplaySize(canvas)
      draw(socket, ctx, frameCount)
      movement(socket, ctx, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas id={id} ref={canvasRef} className="border-2 border-gray-600 select-none box-border hidden"/>
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