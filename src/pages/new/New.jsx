import React, { useState } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "../../api/axios";
import { useNavigate  } from "react-router-dom";

const New = ({ title }) => {
  const [file, setFile] = useState("");
  const [formInputs, setFormInputs] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate ();
  const inputs = [
    {
      id: 1,
      label: "First name",
      type: "text",
      placeholder: "John Doe",
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
      type: "email",
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
      placeholder: "YYYY-MM-DD",
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
      id: 9,
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
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const binaryString = reader.result;
      setFile(binaryString);
    };
    reader.readAsDataURL(uploadedFile);
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
    // Email validation regex pattern
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      if (!file) {
        setFormErrors({ ...formErrors, file: "Image is required" });
        alert("Image is required");
      } else {
        try {
          const requestData = {
            firstName: formInputs["First name"],
            lastName: formInputs["Last name"],
            email: formInputs["Email"],
            password: formInputs["Password"],
            phone: formInputs["Phone"],
            birthDate: formInputs["Date of Birth"],
            gender: formInputs["Gender"],
            status: formInputs["Status account"],
            image: file,
          };
  
          const response = await axios.post("/SignupMemberAdmin", requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          alert("Form submitted successfully.");
          navigate("/users");
        } catch (error) {
          console.error(error);
          if (error.response) {
            alert("Failed to submit form: " + error.response.data.error);
          } else {
            alert("Failed to submit form.");
          }
        }
      }
    } else {
      alert("Form validation failed.");
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
          {formErrors.file && <p className="error">{formErrors.file}</p>}
            <img
              src={file || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
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
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  name="file"
                  
                />
                {formErrors["Image"] && (
                  <p className="error">{formErrors["Image"]}</p>
                )}
              </div>

              {inputs.map((input) =>
                input.type === "select" ? (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <select
                      value={selectedOption}
                      onChange={handleOptionChange}
                      name={input.label}
                    >
                      {input.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {formErrors[input.label] && (
                      <p className="error">{formErrors[input.label]}</p>
                    )}
                  </div>
                ) : (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      name={input.label}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors[input.label] && (
                      <p className="error">{formErrors[input.label]}</p>
                    )}
                  </div>
                )
              )}

              <button type="submit" style={{ alignItems:'center',marginLeft:50}}>Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
