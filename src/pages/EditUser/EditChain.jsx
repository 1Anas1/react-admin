import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import "./EditUser.scss";
  import axios from "../../api/axios";
  import Navbar from "../../components/navbar/Navbar";
  import Sidebar from "../../components/sidebar/Sidebar";
  import { useParams } from 'react-router-dom';
  export default function User() {
    const LOGIN_URL = "/api/professional/getChainById";
    const { chainId } = useParams();
  const [data, setData] = useState([{
          
    idUser:"",
    id: "",
    chainname: "",
    img: "",
    owner: "",
}]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  
      console.log(chainId);
    async function fetchData() {
      try {
        const response = await axios.get(`${LOGIN_URL}/${chainId}`, {
          headers: {
            'Content-Type': 'application/json',
           
          },
          withCredentials: false,
        });
        console.log(response?.data.chain)
        setData(response?.data.chain);
        
        setLoading(false);
      } catch (err) {
        if (!err?.response) {
          console.log('No server response');
        }
      }
    }

    fetchData();
  }, [chainId]);
    return (
        <div className="useredit">
            <Sidebar/>
            <div className="usercontainer1">
                <Navbar/>
                {!loading &&(
                  <>
                <div className="userTitleContainer">
                    <h1 className="userTitle">Profile</h1>
                </div>
                <div className="userContainer">
                    
                  <div className="userShowEdit">
                    <div className="userShowTop">
                      <img
                        src="https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/56828017_850214761982793_7110731517202006016_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aN1vSefHQLwAX_R6gmk&_nc_ht=scontent.ftun16-1.fna&oh=00_AfCKiYkr9FkBZvpYAlXCJMztwOHZTcUCh4jtyoqVlMYutg&oe=649E4156"
                        alt=""
                        className="userShowImg"
                      />
                      <div className="userShowTopTitle">
                        <span className="userShowUsername">{data.chain_name}</span>
                        <span className="userShowUserTitle">Chain</span>
                      </div>
                    </div>
                  
                    
                  </div>
                  <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Chain name</label>
                          <input
                            type="text"
                            placeholder="anass007"
                            className="userUpdateInput"
                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Owner Name</label>
                          <input
                            type="text"
                            placeholder="cherni anass"
                            className="userUpdateInput"
                          />
                        </div>
                      
                        
                        
                        <div className='userUpdateItem'>
          <label for="gender">Shop</label>
          <select id="gender" className="selectinfo">
            <option value="male">Chaneb</option>
            <option value="female">Baguette</option>
          </select>
        </div>



          
            
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                          <img
                            className="userUpdateImg"
                            src="https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/56828017_850214761982793_7110731517202006016_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aN1vSefHQLwAX_R6gmk&_nc_ht=scontent.ftun16-1.fna&oh=00_AfCKiYkr9FkBZvpYAlXCJMztwOHZTcUCh4jtyoqVlMYutg&oe=649E4156"
                            alt=""
                          />
                          <label htmlFor="file">
                            <Publish className="userUpdateIcon" />
                          </label>
                          <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="userUpdateButton">Update</button>
                      </div>
                    </form>
                  </div>
                </div>
                </>
                )}
      </div>
      </div>
    
    );
  }