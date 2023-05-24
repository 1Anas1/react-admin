import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableClientPro from "../../components/datatable/DatableClientPro"
import { useState,useEffect } from "react";
import axios from '../../api/axios'
const LOGIN_URL ='/api/professional/getAllUser';
const List = () => {
  const [data, setData] = useState({});
  const token= localStorage.getItem("accessToken"); 
  console.log(token);
  useEffect(async ()=>{
    
    
    try {
      const response = await axios.get(
        LOGIN_URL,
        {
          headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
          withCredentials: false,
        }
      );
      console.log(JSON.stringify(response?.data));
      setData(response?.data);
      
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      }
    }
    
},[])
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable member={data.member}/>
        <DatatableClientPro/>
        
      </div>
    </div>
  )
}

export default List