import React, { useRef, useState, useEffect } from 'react'
import Layout from '../Layout'
import { string2Num } from "../../utils/string2Num"

export default function GenerateCharacter() {
  const canvasRef = useRef(null)
  const [magic, setMagic] = useState(1)

  let canvas 
  let ctx

  useEffect(() => {
    canvas = canvasRef.current
    ctx = canvas.getContext('2d')
    canvas.height = 130
    canvas.width = 130
  })
  
  // useEffect(() => {
  //   window.addEventListener("resize", resizeCanvasToDisplaySize)
  //   return () => window.removeEventListener("resize", resizeCanvasToDisplaySize) 
  // }, [magic])

  useEffect(() => {
    ctx.reset()
    generate(ctx, magic)
  }, [magic])
  
  
  function resizeCanvasToDisplaySize() {
    canvas = canvasRef.current
    
    const width = window.innerWidth - 100
    const height = window.innerHeight - 100
  
    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio:ratio=1 } = window
      const context = canvas.getContext('2d')
      canvas.width = width*ratio
      canvas.height = height*ratio
      context.scale(ratio, ratio)
      generate(ctx, magic)
      return true
    }
    return false
  }

  const randomSeed = () => {
    let min = 1
    let max = 9999999999999
    let seed = Math.floor((Math.random() * max) + min);
    return Number(seed)
  }

  const generate = (ctx, mySeed) => {
    let seed = mySeed

    let j, s, X, Y
    let R = ()=> (Math.sin(++s) + 1)*1e9 % 256 | 0; 
    
    ctx.lineWidth = 2
    ctx.scale(10, 10);


    for(let pass = 4; pass >= 0; pass--){
      for(s = seed, j = R()/5 + 50|0; j--;){
        X = j&7,
        Y = j>>3, 
        
        R() < 19 ?                                     
          ctx.fillStyle = `rgb(${R()},${R()},${R()})` : 
          R()**2 / 2e3 > X*X + (Y-5)**2 &&            
            ctx[pass&2 ? 'strokeRect' : 'fillRect'](    
                (6 - pass % 2 * 2 * X + X),        
                (Y + 1),                    
                1, 1);    
      }
    }     
  }

  const handleChange = (e) =>{
    if(!e.target.value) setMagic("")
    if(!e.target.value) return
    let x = e.target.value
    let n = parseInt(x)
    setMagic(n)
  }

  const handleClick = () => {
    setMagic(() => randomSeed())
  }

  const handleSubmit = (e) => {
    
  }

  return (
      <div className='flex justify-center'>
        <div className='bg-orange-200 border-2 border-orange-300 shadow-lg rounded-md p-4 flex space-x-2 justify-center max-w-[600px]'>

          <div className='bg-gray-50 rounded-md'>
            <canvas ref={canvasRef} className="border-2 border-orange-400 rounded-md p-2"/>
          </div>

          <div className='bg-orange-100 max-w-[600px] w-full p-2 flex-col space-y-2 relative'>
            
              <label htmlFor="name" className='flex'>
                <b className='w-1/3'>Name: &nbsp;</b>
                <input type="text"  className="w-2/3 bg-white/50 outline-none ring-orange-400 ring-2 rounded-md" value="Bigpig44"/>
              </label>

              <label htmlFor="seed" className='flex'>
                <b className='w-1/3'>Seed: &nbsp;</b>
                <input type="text"  className="w-2/3 bg-white/50 outline-none ring-orange-400 ring-2 rounded-md" value={magic} onChange={(e) => handleChange(e)} minLength = "1" maxLength = "13"/>
              </label>

            <div className='flex justify-between space-x-2 absolute bottom-2'>
              <button 
                type='submit'
                className='rounded-md bg-orange-600 hover:bg-orange-500 p-2 text-white'
                onClick={handleClick}
              >
                Randomize
              </button>
              <button 
                type='button'
                className='rounded-md bg-green-600 hover:bg-green-500 p-2 text-white'
                onClick={handleClick}
              >
                Create Character
              </button>
            </div>
          </div>

        </div>  
      </div>

  )
}


//546546476987 
//787987987
//5646546548
//2036125651817
//6210047570285
//9425047680324
//9473102849274
//2157966978464
//7401119833798
//2600917840133
//7219019395310
//7925746214747
//502087163492
//1323232
//6288144000152
//2493896398333
//8798564654666
//2071256556792