import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import DatatableChains from "../../components/datatable/DatatableChains"
const LOGIN_URL = "/api/professional/getAllChains";
const ListChains = () => {
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
        const response = await axios.get(LOGIN_URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        });
        console.log(response?.data.chains)
        setData(response?.data.chains);
        
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DatatableChains chain={data} />
        )}
        
      </div>
    </div>
  )
}

export default ListChains