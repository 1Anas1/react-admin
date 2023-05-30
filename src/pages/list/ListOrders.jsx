import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableOrders from "../../components/datatable/DatableOrders"
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useParams } from 'react-router-dom';
const URL="/getBraceletAll";
const ListOrders = () => {

  const [data, setData] = useState([{
          
    idUser:"",
    id: "",
    chainname: "",
    img: "",
    owner: "",
}]);
  
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");



  useEffect(() => {
     
      
    async function fetchData() {
      try {
        const response = await axios.get(URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        });
        console.log(response?.data)
        setData(response?.data);
        
        setLoading(false);
      } catch (err) {
        if (!err?.response) {
          console.log('No server response');
        }
      }
    }

    fetchData();
   
  }, [token]);
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {!loading &&(
          <DatatableOrders order={data} />
        )}
        
        
      </div>
    </div>
  )
}

export default ListOrders