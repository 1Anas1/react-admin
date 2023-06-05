import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useState,useEffect } from "react";
import axios from "../../api/axios";
const Home = () => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';
  const isProfessional = role === 'professional';
  const [data, setData] = useState([{
          
    idUser:"",
    id: "",
    chainname: "",
    img: "",
    owner: "",
}]);
const [loading, setLoading] = useState(true);

  const [operation,setOperation]=useState([]);
  
  const userId  = "6468075f7c75aa4df2408b7e";
  const url = process.env.REACT_APP_URL;
  useEffect(() => {
    console.log(userId);
    async function fetchData() {
      try {
        const response = await axios.post("/getUserInfo",{idUser:userId}, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        });
        console.log(response?.data.user);
        setOperation(response?.data.user.bracelets[0].operations)
        
        
        setLoading(false);
      } catch (err) {
        if (!err?.response) {
          console.log('No server response');
        }
      }
    }

    fetchData();
  }, [token, userId]);
  useEffect(() => {
    
    async function fetchData() {
      try {
        const response = await axios.get("/getUserStatistics", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        });
        console.log(response?.data)
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
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {isAdmin && (
            <>
              <Widget type="user" />
              <Widget type="order" />
              <Widget type="Member" />
              <Widget type="professional client" />
            </>
          )}
          {isProfessional && ( 
               <>
            <Widget type="shops" />
            <Widget type="chain" /></>
          )}
        </div>
      <div className="charts">
          <Featured />
       
       </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table mapUser={operation}/>
        </div>
      </div>
    </div>
  );
};
export default Home;
