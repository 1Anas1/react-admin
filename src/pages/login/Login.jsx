import "./login.scss"
import { Link,useNavigate} from "react-router-dom";
import React,{useState,useContext,useRef, useEffect} from 'react'
import AuthContext from './Context/Authprovider'
import axios from '../../api/axios'
import { PreviewSharp } from "@mui/icons-material";


const LOGIN_URL ='/api/professional/signin';
const Login = () => {
    const {setAuth}=useContext(AuthContext);
    const userRef = useRef();
    const errRef= useRef();
    const [email,setUser]=useState('');
    const[password,setPwd]=useState('');
    const [errMsg,setErrMsg]=useState('');
    const [success,setSuccess]=useState(false);
    const navigate = useNavigate();

    useEffect(()=> {
    userRef.current.focus();


    },[])

    useEffect(()=>{

        setErrMsg('');
    },[email,password])
      
        const [popupStyle,showPopup] = useState("hide")
        const popup = ()=>{
            showPopup("login-popup")
            setTimeout(()=>showPopup("hide"),3000)
        }


        const handleSubmit = async (e) => {
            e.preventDefault();
        
            try {
              console.log({ email, password });
              const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: false,
                }
              );
              console.log(JSON.stringify(response?.data));
        
              const accessToken = response?.data?.token;
              const role = response?.data?.role;
        
              // Store the access token and role in local storage
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('role', role);
        
              // Clear the form fields
              setUser('');
              setPwd('');
        
              // Navigate to /Home route
              window.location.reload();// Use navigate instead of history.push
            } catch (err) {
              if (!err?.response) {
                setErrMsg('No server response');
              } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password');
              } else if (err.response?.status === 401) {
                setErrMsg('Incorrect email or password');
              } else if (err.response?.status === 404) {
                setErrMsg('User not found'); // Ajoutez un message d'erreur spécifique pour l'erreur 404
              } else {
                setErrMsg('Login failed');
              }
            }
          };
  return (
    <div className="container">
    <div className="cover">
        <h1>Sign in</h1>
        <input type="text"
        onChange={(e) => setUser(e.target.value)} 
        value={email}
        ref={userRef}
        required
        placeholder="Email"/>
        <input type="password"
         onChange={(e) => setPwd(e.target.value)} 
         value={password}
         required 
        placeholder="password"/>

        <Link to="/Home" style={{ textDecoration: "none" }}>
    <div className="login-btn" onClick={handleSubmit}>Sign in</div>
    </Link>
    {errMsg && <p className="error-message">{errMsg}</p>}
    <div className={popupStyle}>

        <h3>Login Failed</h3>
        <p> Username or password incorrect</p>
    </div>
    </div>
    </div>
   
)
}

  


export default Login