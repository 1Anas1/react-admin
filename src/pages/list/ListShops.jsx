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
  const role =localStorage.getItem('role');



  useEffect(() => {
    if(role==="admin"){
      async function fetchData() {
        try {
          const response = await axios.get(URL,{
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            withCredentials: false,
          });
          console.log(response?.data);
          setData(response?.data);
          
          setLoading(false);
        } catch (err) {
          if (!err?.response) {
            console.log('No server response');
          }
        }
      }
  
      fetchData()
    }
    
    else {
      async function fetchData() {
        try {
          console.log(token);
          const response = await axios.get(`/getSellingPointsByUserId`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            withCredentials: false,
          });
          console.log(response?.data)
      const transformedData = response?.data.sellingPoints.map((sellingPoint) => ({
        idUser: sellingPoint.ownerId._id,
        _id: sellingPoint.sellingPointId,
        sp_email:sellingPoint.sellingPointEmail,
        sp_name:sellingPoint.sellingPointName,
        owner:{firstName:sellingPoint.ownerId.firstName,lastName:sellingPoint.ownerId.lastName,},
        sp_phone:sellingPoint.sellingPointPhone,
        sp_address:sellingPoint.sellingPointAddress,
        payment_requirement:sellingPoint.paymentRequirement,
        chainname: sellingPoint.chainId ? sellingPoint.chainId.chain_name : '',
        img: sellingPoint.sellingPointImage,
        
      }));
      setData(transformedData);
    
          setLoading(false);
        } catch (err) {
          if (!err?.response) {
            console.log('No server response');
          }
        }
      }
    
      fetchData();
      
  }}, [chainId, role, token]);
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