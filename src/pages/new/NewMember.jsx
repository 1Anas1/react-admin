import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const NewMember = ({ title }) => {
  const { userId } = useParams();
  const [file, setFile] = useState(null);
  const [formInputs, setFormInputs] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const inputs = [
    {
      id: 1,
      label: "First name",
      type: "text",
      placeholder: "john_doe",
    },
    {
      id: 2,
      label: "Last name",
      type: "text",
      placeholder: "John Doe",
    },
    {
      id: 3,
      label: "Email",
      type: "mail",
      placeholder: "john_doe@gmail.com",
    },
    {
      id: 4,
      label: "Phone",
      type: "text",
      placeholder: "+1 234 567 89",
    },
    {
      id: 5,
      label: "Date of Birth",
      type: "date",
      placeholder: "+1 234 567 89",
    },
    {
      id: 6,
      label: "Password",
      type: "password",
    },
    {
      id: 7,
      label: "Gender",
      type: "select",
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
       
      ],
    },
    {
      id: 8,
      label: "Status account",
      type: "select",
      options: [
        { value: "true", label: "Active" },
        { value: "false", label: "Inactive" },
       
      ],
    },
    ];
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };
  
    const validateForm = () => {
      let errors = {};
      for (const input of inputs) {
        if (!formInputs[input.label]) {
          errors[input.label] = `${input.label} is required`;
        } else if (input.type === "email" && !validateEmail(formInputs[input.label])) {
          errors[input.label] = "Invalid email address";
        }
      }
  
      if (!file) {
        errors["Image"] = "Image is required";
      }
  
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    const validateEmail = (email) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        try {
          const reader = new FileReader();
          reader.onloadend = async function () {
            const base64Image = reader.result;
    
            const requestData = {
              idParent: userId,
              firstName: formInputs["First name"],
              lastName: formInputs["Last name"],
              email: formInputs["Email"],
              password: formInputs["Password"],
              phone: formInputs["Phone"],
              birthDate: formInputs["Date of Birth"],
              gender: formInputs["Gender"],
              status: formInputs["Status account"],
              image: base64Image,
            };
    
            // Make the API request with the updated requestData
            const response = await axios.post("/childSignupAdmin", requestData, {
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            if (response.status === 201) {
              alert("Form submitted successfully");
            } else {
              alert(`Error occurred while submitting form: ${response.statusText}`);
            }
          };
    
          reader.readAsDataURL(file);
        } catch (error) {
          console.error(error);
          alert(`Error occurred: ${error.message}`);
        }
      } else {
        alert("Form validation failed. Please make sure all fields are correctly filled out.");
      }
    };
    
    



  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>


              {inputs.map((input) =>
                input.type === "select" ? (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <select
                      name={input.label}
                      value={formInputs[input.label] || ""}
                      onChange={handleInputChange}
                    >
                      {input.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {formErrors[input.label] && <span className="error">{formErrors[input.label]}</span>}
                  </div>
                ) : (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      name={input.label}
                      placeholder={input.placeholder}
                      value={formInputs[input.label] || ""}
                      onChange={handleInputChange}
                    />
                    {formErrors[input.label] && <span className="error">{formErrors[input.label]}</span>}
                  </div>
                )
              )}

    
             
              <button style={{ alignItems:'center',marginLeft:50}}>Create</button>
              

            </form>
            {formErrors["Image"] && <span className="error">{formErrors["Image"]}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMember;