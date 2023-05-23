import "./login.scss"
import { Link } from "react-router-dom";
import React,{useState} from 'react'

const Login = () => {
    
        const [popupStyle,showPopup] = useState("hide")
        const popup = ()=>{
            showPopup("login-popup")
            setTimeout(()=>showPopup("hide"),3000)
        }
  return (
    <div className="cover">
        <h1>Sign in</h1>
        <input type="text" placeholder="Email"/>
        <input type="password" placeholder="password"/>

        <Link to="/Home" style={{ textDecoration: "none" }}>
    <div className="login-btn" onClick={popup}>Sign in</div>
    </Link>
    <div className={popupStyle}>

        <h3>Login Failed</h3>
        <p> Username or password incorrect</p>
    </div>
    </div>
   
)
}

  


export default Login