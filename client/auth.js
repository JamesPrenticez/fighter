let authContainer = document.getElementById("auth-container");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let registerButton = document.getElementById("register");
let loginButton = document.getElementById("login");

const socket = io();

loginButton.onclick = (event) => {
  event.preventDefault();
  socket.emit("login", {username: usernameInput.value, password: passwordInput.value})
}

registerButton.onclick = (event) => {
  event.preventDefault();
  socket.emit("register", {username: usernameInput.value, password: passwordInput.value})
}

//Listen for login response
socket.on('loginResponse', (data) => {
  if(data.success){
    authContainer.style.display = "none"
    canvas.style.display = "inline-block"
  } else {
    alert("Sign in unsuccessful")
  }
})

//Listen for registration response
socket.on('registrationResponse', (data) => {
  if(data.success){
    alert("Account created!")
  } else {
    alert("Registration unsuccessful")
  }
})


function register(){
  //prevent.default()
  //socket.emit("signin", {username: usernameInput.value, password: passwordInput.value})
  console.log("register")
}