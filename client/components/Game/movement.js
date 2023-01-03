import { useKeyPressed } from "../../hooks/useKeyPressed";

const downArrowPressed = useKeyPressed('ArrowDown')
const upArrowPressed = useKeyPressed('ArrowUp')
const enterPressed = useKeyPressed('Enter')


export function movement(socket, ctx, framecount){
  if (downArrowPressed){
    // if (event.keyCode === 87) socket.emit("keyPress", {inputId:"up", state: true}); // w
    // else if (event.keyCode === 83) socket.emit("keyPress", {inputId:"down", state: true}); // s
    // else if (event.keyCode === 68) socket.emit("keyPress", {inputId:"right", state: true}); // d
    // else if (event.keyCode === 65) socket.emit("keyPress", {inputId:"left", state: true}); // a
  }

}


// //send to the server
// document.onkeydown = (event) => {
//   if (event.keyCode === 87) socket.emit("keyPress", {inputId:"up", state: true}); // w
//   else if (event.keyCode === 83) socket.emit("keyPress", {inputId:"down", state: true}); // s
//   else if (event.keyCode === 68) socket.emit("keyPress", {inputId:"right", state: true}); // d
//   else if (event.keyCode === 65) socket.emit("keyPress", {inputId:"left", state: true}); // a
// }
// document.onkeyup = (event) => {
//   if (event.keyCode === 87) socket.emit("keyPress", {inputId:"up", state: false}); // w
//   else if (event.keyCode === 83) socket.emit("keyPress", {inputId:"down", state: false}); // s
//   else if (event.keyCode === 68) socket.emit("keyPress", {inputId:"right", state: false}); // d
//   else if (event.keyCode === 65) socket.emit("keyPress", {inputId:"left", state: false}); // a
// }
// document.onmousedown = (event) => {
//   if (event.button === 0) socket.emit("keyPress", {inputId:"attack", state: true}) //left click
//   else if (event.button === 1) console.log("middle button")
//   else if (event.button === 2) socket.emit("right click") 
// }
// document.onmouseup = (event) => {
//   if (event.button === 0) socket.emit("keyPress", {inputId:"attack", state: false}) //left click
// }
// document.onmousemove = (event) => {
//   socket.emit("keyPress", {inputId:"clientX", state:event.clientX})
//   socket.emit("keyPress", {inputId:"clientY", state:event.clientY})
// }