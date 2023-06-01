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
  statusBraclet :"",
  is_disabled:"",
});
const role =localStorage.getItem('role');
  const [loading, setLoading] = useState(true);
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    
    if (uploadedFile) {  // check if file exists
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result;
        setFile(base64String);
        setData({ ...data, image: base64String });
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
        is_disabled: response?.data.user.is_disabled,
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

  // Prepare the data to send in the request body
  data.userId=userId;
  console.log(data)

  try {
    // send data to the server
    const response = await axios.put("/editUser", data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });
  
    // handle response
    if (response.status === 200) {
      // Handle successful response here
      console.log('User information updated successfully');
      // Optionally redirect the user to another page or reset form fields
    } else {
      // Handle other responses here
      console.log('Update unsuccessful');
    }
  } catch (error) {
    // Handle errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in Node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
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
              src={url+"/uploads/"+user.image}
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
              <span className="userShowInfoTitle">{user.firstName} {user.lastName}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.birthDate}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
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
                  value={data.firstName}
                  onChange={e => setData({...data, firstName: e.target.value})}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={e => setData({...data, lastName: e.target.value})}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={data.email}
                  onChange={e => setData({...data, email: e.target.value})}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                 value={data.phone}
                 onChange={e => setData({...data, phone: e.target.value})}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Date of birth</label>
                <input
                  type="date"
                  value={data.birthDate}
                  onChange={e => setData({...data, birthDate: e.target.value})}
                  className="userUpdateInput"
                />
              </div>
              <div className='userUpdateItem'>
<label for="gender">Gender</label>
<select name="gender" id="gender" value={data.gender || ''}  onChange={e => setData({...data, gender: e.target.value})}>
  <option value="" disabled>Select gender</option>
  <option value="Male" selected={user.gender === 'Male'}>Male</option>
  <option value="Female" selected={user.gender === 'Female'}>Female</option>
</select>
</div>

{role !== "professional" && (
  <div className='userUpdateItem'>
    <label htmlFor="is_disabled">Status bracelet</label>
    <select name="is_disabled" id="is_disabled"  onChange={e => setData({...data, is_disabled: e.target.value})}>
      <option value="false" selected={!user.bracelets[0].is_disabled}>Active</option>
      <option value="true" selected={user.bracelets[0].is_disabled}>Inactive</option>
    </select>
  </div>
)}



 
  
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
              <button className="userUpdateButton" >Update</button>
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