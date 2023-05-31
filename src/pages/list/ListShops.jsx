import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableShops from "../../components/datatable/DatableShops"
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useParams } from 'react-router-dom';
const LOGIN_URL = "/api/professional/getSellingPointsByChainId";
const URL="/api/professional/getSellingPoints";
const ListShops = () => {
  const { chainId } = useParams();
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
    if (chainId) {
      console.log(chainId);
    async function fetchData() {
      try {
        const response = await axios.get(`${LOGIN_URL}/${chainId}`, {
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

    fetchData();}
    else {  async function fetchData() {
      try {
        const response = await axios.get(URL,{
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

    fetchData();}
  }, [chainId, data, token]);
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {!loading &&(
          <DatatableShops shop={data} />
        )}
        
      </div>
    </div>
  )
}

export default ListShops