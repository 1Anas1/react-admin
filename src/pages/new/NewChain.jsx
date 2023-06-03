import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate  } from "react-router-dom";
const NewChain = ({ inputs, title }) => {
  const navigate = useNavigate ();
  const [selectedOption, setSelectedOptions] = useState("");
  const [ownerOptions, setOwnerOptions] = useState([]);

  useEffect(() => {
    axios
      .get("/getUsersByProfessionalRole")
      .then((response) => {
        const options = response.data.map((user) => ({
          value: user._id,
          label: `${user.firstName} ${user.lastName}`,
        }));
        setOwnerOptions(options);
        setSelectedOptions(options.length > 0 ? options[0].value : "");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const chaininput = [
    {
      id: 1,
      label: "Chain name",
      type: "text",
      placeholder: "John Doe",
    },
    {
      id: 2,
      label: "Owner name",
      type: "select",
      options: ownerOptions,
    },
  ];

  const [file, setFile] = useState("");
  const [formInputs, setFormInputs] = useState({});
  const [error, setError] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOptions(e.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Perform input and file verification
    if (!formInputs["Chain name"]) {
      alert("Please enter a chain name.");
      return;
    }
    if (!formInputs["Owner name"]) {
      alert("Please select an owner name.");
      return;
    }
    if (!file) {
      alert("Please upload an image.");
      return;
    }
  
    // Create the payload for the POST request
    const payload = {
      chain_name: formInputs["Chain name"],
      ownerId: formInputs["Owner name"],
      chain_image: file,
    };
  
    // Make the POST request using Axios
    axios
      .post("/api/professional/createChain", payload) // Replace "/api/createChain" with your actual API endpoint
      .then((response) => {
        // Handle the successful response
        alert("Chain created successfully.");

        // Reset form inputs and file
        setFormInputs({});
        setFile("");
        navigate("/chains");
      })

      .catch((error) => {
        // Handle the error
        console.error(error);
        alert("Failed to create chain. Please try again.");
      });
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
                  ? file
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            {error && <p>{error}</p>}
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
                />
              </div>

              {chaininput.map((input) =>
                input.type === "select" ? (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <select
                      value={formInputs[input.label] || selectedOption}
                      onChange={handleOptionChange}
                      name={input.label}
                    >
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
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      name={input.label}
                      onChange={handleInputChange}
                    />
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

export default NewChain;
