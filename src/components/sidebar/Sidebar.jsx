import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link ,useNavigate} from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
   const token = localStorage.getItem("accessToken");
  const role =localStorage.getItem('role');
  const navigate=useNavigate();
  const handleLogout = () => {
    // Clear the access token and role from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
  
    // Refresh the page
    navigate('/');
    window.location.reload();
    
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none",display:'flex',alignItems:'center',justifyContent:'center' }}>
        <img src={process.env.PUBLIC_URL+'logoo.png'} width='150px' alt="cashless" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          {role === "admin" && (
  <>
    <Link to="/users" style={{ textDecoration: "none" }}>
      <li>
        <PersonOutlineIcon className="icon" />
        <span>Users</span>
      </li>
    </Link>
    <Link to="/products" style={{ textDecoration: "none" }}>
      <li>
        <StoreIcon className="icon" />
        <span>Shops</span>
      </li>
    </Link>
    <Link to="/Orders" style={{ textDecoration: "none" }}>
      <li>
        <CreditCardIcon className="icon" />
        <span>Orders</span>
      </li>
    </Link>
    <Link to="/chains" style={{ textDecoration: "none" }}>
      <li>
        <DomainAddIcon className="icon" />
        <span>Chains</span>
      </li>
    </Link>
  </>
)}
{role === "professional" && (
  <>
  <Link to="/products" style={{ textDecoration: "none" }}>
    <li>
      <StoreIcon className="icon" />
      <span>Shops</span>
    </li>
  </Link>
   <Link to="/chains" style={{ textDecoration: "none" }}>
   <li>
     <LocalShippingIcon className="icon" />
     <span>Chains</span>
   </li>
 </Link>
 </>
)}
          
         
          
          
          <p className="title">USER</p>
          <Link to="/Profil" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <li onClick={handleLogout}>
      <ExitToAppIcon className="icon" />
      <span>Logout</span>
    </li>
        </ul>
      </div>
     
    </div>
  );
};

export default Sidebar;
