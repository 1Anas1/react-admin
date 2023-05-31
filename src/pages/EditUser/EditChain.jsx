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
    const UPDATE_URL = "/api/professional/updateChain";
    const { chainId } = useParams();
    const [file, setFile] = useState("");
    const [formErrors, setFormErrors] = useState({});
  const [data, setData] = useState([{
          
    idUser:"",
    id: "",
    chainname: "",
    img: "",
    owner: "",
}]);
const handleFileUpload = (e) => {
  const uploadedFile = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64String = reader.result;
    setFile(base64String);
    setData({ ...data, img: base64String });
  };

  reader.readAsDataURL(uploadedFile);
};
const validateForm = () => {
  let isValid = true;
  let errors = {};

  if (!data.chain_name) {
    isValid = false;
    errors["chainname"] = "Chain name is required";
  }

  if (!file) {
    isValid = false;
    errors["Image"] = "Image file is required";
  }

  setFormErrors(errors);

  return isValid;
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Continue with API request...
};
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
                        src={data.chain_image}
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
                    <form className="userUpdateForm" onSubmit={handleSubmit}>
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Chain name</label>
                          <input
                            type="text"
                            value={data.chain_name}
                            onChange={e => setData({...data, chain_name: e.target.value})}
                            className="userUpdateInput"
                          />
                          {formErrors["chainname"] && (
    <p className="error">{formErrors["chainname"]}</p>
  )}
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