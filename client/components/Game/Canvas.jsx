import React, { useRef, useEffect } from 'react'

// ====================================================================================== 
//  Canvas 
// ====================================================================================== 
const Canvas = props => {
  
  const { draw } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      resizeCanvasToDisplaySize(canvas)
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} className="border-2 border-green-400 rounded-md"/>
}

export default Canvas

// ====================================================================================== 
// Resize 
// ====================================================================================== 
function resizeCanvasToDisplaySize(canvas) {
    
  const width = window.innerWidth - 100
  const height = window.innerHeight - 100

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