import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import LocationInput from "../../components/LocationInpout/LocatilonInpout";

const NewShop = ({ title }) => {
  const [file, setFile] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  const inputs = [
    
        
    
    { 
      
      id: 1,
      label: "Name Shop",
      type: "text",
      placeholder: "Chaneb Tacos",
      
    },
    {id: 2,
        label: "Owner name",
        type: "text",
        placeholder: "Eya Belkadhi",
       
      },
    {
        id: 3,
        label: "Email",
        type: "text",
        placeholder: "eyabelkadhi@gmail.com",
    },
    {
        id: 4,
        label: "Phone number",
        type: "text",
        placeholder: "98705040",
    },
    {
        id: 5,
      label: "Location",
      type: "text",
      placeholder: "Ariana",
      },
      {
        id: 6,
      label: "Remise",
      type: "text",
      placeholder: "20",
      },
      
      {
        id: 7,
      label: "Entryfee",
      type: "text",
      placeholder: "10",
      },
    {
        id: 8,
      label: "Status shop",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
       
      ],
    },
  ];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
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
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
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
              <div className="formInput" key={input.id} >
                <label>{input.label}</label>
                <select value={selectedOption} onChange={handleOptionChange}>
                  
                  {input.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input type={input.type} placeholder={input.placeholder} />
              </div>
              ))}
              <div>
             <LocationInput /></div>
              <button>Create</button>
              
            </form>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default NewShop;
