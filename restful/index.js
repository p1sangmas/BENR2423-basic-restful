const express = require('express')
const app = express()
const port = 3000

let dbUsers = [
  {
      username: "fakhrul",
      password: "baga",
      email: "fakhrul@gmail.com"
  },
      {
      username: "fahmi",
      password: "pami",
      email: "fahmi@gmail.com"
  },
      {
      username: "saiful",
      password: "sepul",
      email: "saiful@gmail.com"
  }
]

// enable json body parsing
app.use(express.json())

// create a GET route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  let data = req.body
  let loginResult = login(data.username, data.password)
  res.send(
    {
      status: loginResult,
      originalData: data,
      date: Date.now()
    })
})

// create a POST route for the user to login
app.post('/login', (req, res) => {

  // get the usernames and passwords from the request body
  const {username, password} = req.body;

  // find the user in the database
  const user = dbUsers.find(user => user.username === username && user.password === password);

  // if user is found, return the user object
  if (user) {
    res.send(user);
  } else {

    // if user is not found, return an error
    res.send({ error: "User not found"});
  }
})

// create a POST route for the user to register
app.post('/register', (req, res) => {
  let data = req.body
  res.send(
    register(data.username, data.password, data.email)
  )
})

app.get('/bye', (req, res) => {
    res.send('Bye Bye World!')
})

// start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function login(username, password) {
  console.log("Someone try to login with username:", username, "and password:", password)
  let matched = dbUsers.find(element =>
      element.username == username
  ) // finding element in the array
  if (matched) {
      if (matched.password == password) {
          return matched
      } else {
          return "Passwords do not match"}
  } else {
      return "Username not found"
  }
}

function register (newusername, newpassword, newemail) {
  // todo: check if username exist
  let userCheck = dbUsers.find(element =>
      element.username == newusername
  ) // check username in database
  if (userCheck){
      return "User already registered"
  } else {
      dbUsers.push({
          username: newusername,
          password: newpassword,
          email: newemail
      })
  }
  return "Registered successfully"
}