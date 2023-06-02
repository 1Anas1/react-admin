import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import { Link } from "react-router-dom";
  import "./EditUser.scss";
  import Navbar from "../../components/navbar/Navbar";
  import Sidebar from "../../components/sidebar/Sidebar";
  import React, { useState, useEffect } from "react";
  import LocationInput from "../../components/LocationInpout/LocatilonInpout";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
  export default function User() {
    const [user,setUser]=useState({});
  const [file, setFile] = useState("");
  const [formErrors, setFormErrors] = useState({});
const [member,setMember]=useState([]);
const [operation,setOperation]=useState([]);
const token = localStorage.getItem("accessToken");
const { userId } = useParams();
const url = process.env.REACT_APP_URL;
const [data, setData] = useState({
  id: "",
  name_shop: "",
  email:"",
  phone_number: "",
  location: "",
  status_shop: "",
  owner:"",
  chain:"",
  position: "",
});
const psoi = (pos) => {
  console.log("lata", pos);
  setData({ ...data, position: pos });
};
const role =localStorage.getItem('role');
  const [loading, setLoading] = useState(true);
  
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/professional/getSellingPointInfo/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        });
        console.log(response.data);
        setData({
          name_shop: response?.data.name_shop,
          email: response?.data.email,
          phone_number: response?.data.phone_number,
          location: response?.data.location,
          status_shop: response?.data.status_shop,
          owner: response?.data.owner,
          chain: response?.data.chain,
          position: response?.data.position,
        });
  
        setLoading(false);
      } catch (err) {
        if (!err?.response) {
          console.log('No server response');
        }
      }
    }
  
    fetchData();
  }, [token, userId]);
  
  
  
  
  
const handleChange = (e) => {
  setData({
    ...data,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  data.id=userId;
  console.log(data)
  try {
    const response = await axios.put(`/api/professional/editShop`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('Shop information updated successfully');
    } else {
      console.log('Update unsuccessful');
    }
  } catch (error) {
    console.log(error);
  }
};



    return (
        <div className="useredit">
            <Sidebar/>
            <div className="usercontainer1">
                <Navbar/>
                {!loading &&(<>
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
                <span className="userShowUsername">{data.name_shop}</span>
                <span className="userShowUserTitle">Shop</span>
              </div>
            </div>
            
            
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Name shop</label>
                  <input
      type="text"
      placeholder="anass007"
      className="userUpdateInput"
      value={data.name_shop}
      onChange={(e) => setData({ ...data, name_shop: e.target.value })}
    />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="cherni anass"
                    className="userUpdateInput"
                    value={data.email}
      onChange={(e) => setData({ ...data, email: e.target.value })}
                  />
                </div>
              
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="cherni.anass02@gmail.com"
                    className="userUpdateInput"
                    value={data.phone_number}
      onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Remise</label>
                  <input
                    type="text"
                    placeholder="20"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Entryfee</label>
                  <input
                    type="text"
                    placeholder="10"
                    className="userUpdateInput"
                  />
                </div>
                


<div className='userUpdateItem'>
  <label for="status shop">Status shop</label>
  <select id="status shop" className="selectinfo" onChange={(e) => setData({ ...data, status_shop: e.target.value })}>
    <option value="active"selected={data.status_shop === 'active'}>Active</option>
    <option value="inactive"selected={data.status_shop === 'inactive'}>Inactive</option>
  </select>
</div>

<div className="userupdatelocation">
                <LocationInput setPosition={(pos) => psoi(pos)} />
              </div>
   
    
              </div>
              <div className="userUpdateRight">
                
                <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
              </div>
            </form>
          </div>
        </div></>)}
      </div>
      </div>
    
    );
  }