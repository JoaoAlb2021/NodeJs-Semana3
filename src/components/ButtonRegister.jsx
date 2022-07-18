import React, { useState } from "react";
import { Link } from "react-router-dom";

const ButtonRegister = () => {
  const [show, setShow] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState(true);
  
  const signUp = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: usuario, email: email, password: password }),
    };
    fetch("http://localhost:5000/users", requestOptions)
    .then(response=>response.json())
    .then((data)=>{
      if(usuario.length > 1 && email.length > 1 && password.length >= 8){
        setLink(!link)
        alert("Nice Work!")
      }else {
        alert(data.message)
      }
    })
  };
  return (
    <div className="Buttons" id="loginButton">
      <button className="btn" onClick={() => setShow(!show)}>
        REGISTER
      </button>
      {show ? (
        ""
      ) : (
        <div>
          <div>
            <input
              type="text"
              name="usuario"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <form>
            <button id="signUp-btn" onClick={signUp} type="submit" className="btn">
            {link ? ("Sign Up") : (<Link to="/SignUp">Sign Up</Link>)}

            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ButtonRegister;
