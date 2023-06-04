import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";

import ListShops from "../../components/table/TransactionsShop";

import DatatableEmploye from "../../components/datatable/DatableEmploye";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
const SingleShop = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user,setUser]=useState({});
  const [emp,setEmp]=useState([]);
  const [operation,setOperation]=useState([]);
  const token = localStorage.getItem("accessToken");
  const url = process.env.REACT_APP_URL;
  useEffect(() => {
    console.log(productId);
    async function fetchData() {
      try {
        const response = await axios.post("/getShopWithEmployees",{shopId:productId}, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        });
        console.log(response?.data);
        setUser(response?.data)
        setEmp(response?.data.empl)
        
        
        setLoading(false);
      } catch (err) {
        if (!err?.response) {
          console.log('No server response');
        }
      }
    }

    fetchData();
  }, [productId, token]);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
               
               
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title"></h1>
          <DatatableEmploye emp={emp} idSellingPoint={productId} />
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <ListShops/> 
        </div>
      </div>
    </div>
  );
};

export default SingleShop;
