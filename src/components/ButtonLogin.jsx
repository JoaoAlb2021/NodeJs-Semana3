import React, {useState} from "react";
import {Link} from "react-router-dom"

const ButtonLogin = () => {
    const [show, setShow] = useState(true);
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: usuario, password: password }),
        };
        fetch("http://localhost:5000/login", requestOptions)
        .then(response=>response.json())
        .then((data)=>{
          if(usuario.length > 1 && password.length >= 8){
            alert("Nice Work!")
          }else {
            alert(data.message)
          }
        })
      }

      return (
        <div className="Buttons" id="loginButton">
          <button className="btn" onClick={() => setShow(!show)}>
            LOGIN
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <form>
                <button id="signUp-btn" onClick={signUp} type="submit" className="btn">
                <Link to="/Login">Sign In</Link>
    
                </button>
              </form>
            </div>
          )}
        </div>
      );
    };
export default ButtonLogin