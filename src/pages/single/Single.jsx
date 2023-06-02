import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import Datatablemember from "../../components/datatable/Datatablemember"
import axios from "../../api/axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
const Single = () => {
  const [loading, setLoading] = useState(true);
  const [user,setUser]=useState({});
  const [member,setMember]=useState([]);
  const [operation,setOperation]=useState([]);
  const token = localStorage.getItem("accessToken");
  const { userId } = useParams();
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
        setUser(response?.data.user);
        setOperation(response?.data.user.bracelets[0].operations)
        console.log(typeof response?.data.user.children)
        setMember(response?.data.user.children)
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
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
           
            <h1 className="title">Information</h1>
            <div className="item">
              
              {user.image ? (
              <img
                src={url + "/uploads/" + user.image}
                alt=""
                className="itemImg"  // Add the class name here
              />
            ) : (
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"  // Add the class name here
              />
            )}
              
              <div className="details">
                
                <h1 className="itemTitle">{user.lastName} {user.firstName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
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
          <Datatablemember member={member} id={userId} />
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List mapUser={operation}/>
        </div>
      </div>
    </div>
  );
};

export default Single;
