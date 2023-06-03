import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const NewEmploye = ({ title }) => {
  const { idSellingPoint } = useParams();
  const [file, setFile] = useState(null);
  const [formInputs, setFormInputs] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [formErrors, setFormErrors] = useState({});

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
      placeholder: "Doe",
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
      label: "Role",
      type: "select",
      options: [
        { value: "manager", label: "Manager" },
        { value: "cashier", label: "Cashier" },
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
    if (selectedOption === "") {
      errors["Role"] = "Role is required";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const reader = new FileReader();
      reader.onloadend = async function () {
        const base64Image = reader.result;

        const requestData = {
          idSellingPoint:idSellingPoint,
          firstName: formInputs["First name"],
          lastName: formInputs["Last name"],
          email: formInputs["Email"],
          password: formInputs["Password"],
          phone: formInputs["Phone"],
          birthDate: formInputs["Date of Birth"],
          roleEmp: selectedOption,
          image: base64Image,
        };

        console.log(requestData);
        // Make the API request with the updated requestData
        // Implement your API call here using axios or any other library
        const response = await axios.post("/empSignupAdmin", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Form submitted");
        console.log(response.data);
      };

      reader.readAsDataURL(file);
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
        value={selectedOption} // Use selectedOption instead of formInputs[input.label]
        onChange={handleOptionChange}
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

              <button type="submit">Create</button>
              {formErrors["Image"] && <span className="error">{formErrors["Image"]}</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmploye;
