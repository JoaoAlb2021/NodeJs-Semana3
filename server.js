const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

const bcrypt = require("bcrypt");
const constantNumber = 2;
const jwt = require("jsonwebtoken");
const jwtSecret = "este es mi secreto";

app.use(express.json());
app.use(cors());

function getUserFromDatabase() {
  const text = fs.readFileSync("users.json");
  return JSON.parse(text);
}

function saveUserToDatabase(arr) {
  return fs.writeFileSync("users.json", JSON.stringify(arr, null, 2));
}

function generateJWT(userId) {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

function authenticate (req, res, next) {
  let token = req.header("authorization");
  
  if (!token) {
    return res.status(403).send({ message: "authorization denied", isAuthenticated: false });
  }

  token = token.split(" ")[1];
  
  try {
    const verify = jwt.verify(token, jwtSecret);

    req.user = verify.user;
    
    next();
    
  } catch (err) {
    res.status(401).send({ message: "Token is not valid", isAuthenticated: false });
  }
};

const getUser = async function (req, res) {
  const loginUser = req.body;
  loginUser.name = loginUser.name.trim()
  const users = getUserFromDatabase();

  const jwtToken = generateJWT(loginUser.id);
    res
      .status(201)
      .json({ jwtToken: jwtToken, id: loginUser.id, name: loginUser.name});

}

const postNewuser = async function (request, response) {
  const newUser = request.body;
  newUser.name = newUser.name.trim();
  newUser.email = newUser.email.trim();
  const users = getUserFromDatabase();
  const sameUser = users.find((u) => u.name === newUser.name);
  const sameEmail = users.find((u) => u.email === newUser.email);
  if (newUser.name.length < 1) {
    response.status(400).json({ message: "Name require" });
  } else if (newUser.email.length < 1) {
    response.status(400).json({ message: "Email require" });
  } else if (newUser.password.length < 8) {
    response.status(400).json({ message: "Password require 8 or more characters" });
  } else if (sameUser || sameEmail) {
    response
      .status(400)
      .json({ message: "user with same name or email already exists." });
  } else {
    newUser.id = users.length + 1;
    const salt = await bcrypt.genSalt(constantNumber);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    users.push(newUser);

    saveUserToDatabase(users);
    response
      .status(201)
      .json({ id: newUser.id, name: newUser.name, email: newUser.email, password: newUser.password});
  }
};

app.get("/users", (req, res) => {
  const users = getUserFromDatabase();
  res.send(users);
});

app.post("/users", postNewuser);
app.get("/login", authenticate, getUser);
const port = 5000;
app.listen(port, () => {
  console.log("Server is listening at http://localhost:" + port);
});
