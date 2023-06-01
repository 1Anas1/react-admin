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
  firstName: "",
  lastName:"",
  image: "",
  email: "",
  phone:"",
  gender:"",
  birthDate:"",
  statusaccount  : "",
  statusBraclet :""
});

  const [loading, setLoading] = useState(true);
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    
    if (uploadedFile) {  // check if file exists
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result;
        setFile(base64String);
        setData({ ...data, img: base64String });
      };
    
      reader.readAsDataURL(uploadedFile);
    }
  };
  

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
      setData({
        firstName: response?.data.user.firstName,
        lastName: response?.data.user.lastName,
        email: response?.data.user.email,
        phone: response?.data.user.phone,
        birthDate: response?.data.user.birthDate,
        gender: response?.data.user.gender,
        statusBracelet: response?.data.user.bracelets[0].status,
      });
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
const handleChange = (e) => {
  setData({
    ...data,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // send data to the server
  const response = await axios.post("/editUser", {...data, idUser: userId}, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: false,
  });
  
  // handle response...
};
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
          
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/56828017_850214761982793_7110731517202006016_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aN1vSefHQLwAX_R6gmk&_nc_ht=scontent.ftun16-1.fna&oh=00_AfCKiYkr9FkBZvpYAlXCJMztwOHZTcUCh4jtyoqVlMYutg&oe=649E4156"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.firstName}</span>
              <span className="userShowUserTitle">Principal Users</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">cherni.as</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">cherni.anass02@gmail.com</span>
            </div>
           
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>First name</label>
                <input
                  type="text"
                  value={user.firstName}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  value={user.lastName}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={user.email}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                 value={user.phone}
                 onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Date of birth</label>
                <input
                  type="date"
                  value={user.birthDate}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className='userUpdateItem'>
<label for="gender">Gender</label>
<select name="gender" id="gender" value={user.gender} onChange={handleChange}>
  <option value="Male" selected={user.gender === 'Male'}>Male</option>
  <option value="Female" selected={user.gender === 'Female'}>Female</option>
</select>
</div>

<div className='userUpdateItem'>
<label for="Status Bracelet">Status bracelet</label>
<select name="statusBracelet" id="statusBracelet"  value={user.statusBracelet} onChange={handleChange}>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</select>
</div>

 
  
            </div>
            <div className="userUpdateRight">
                      {formErrors["Image"] && (
    <p className="error">{formErrors["Image"]}</p>
  )}
                        <div className="userUpdateUpload">
                          <img
                            className="userUpdateImg"
                            src={file || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                            alt=""
                          />
                         
                        
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  name="file"
                  
                />
                </div>
              <button className="userUpdateButton" type="submit">Update</button>
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