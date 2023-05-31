import React, { useState,useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import LocationInput from "../../components/LocationInpout/LocatilonInpout";
import axios from "../../api/axios";
const NewShop = ({ title }) => {
  const [formInputs, setFormInputs] = useState({
    name_shop: "",
    email: "",
    phone_number: "",
    location: "",
    remise: "",
    entryfee: "",
    status_shop: "",
    owner: "",
    position: { lat: null, lng: null },
  });
  const [ownerOptions, setOwnerOptions] = useState([]);
  useEffect(() => {
    const getProfessionalUsers = async () => {
      try {
        const response = await axios.get('/getProfessionalUsers');
        const options = response.data.map(user => ({ value: user._id, label: user.email }));
        setOwnerOptions(options);
      } catch (error) {
        console.error('Failed to fetch professional users', error);
      }
    };

    getProfessionalUsers();
  }, []);
  const inputs = [
    
        
    
    { 
      
      id: 1,
      label: "name_shop",
      type: "text",
      placeholder: "Chaneb Tacos",
      
    },
    {
        id: 2,
        label: "email",
        type: "text",
        placeholder: "eyabelkadhi@gmail.com",
    },
    {
        id: 3,
        label: "phone_number",
        type: "text",
        placeholder: "98705040",
    },
    {
        id: 4,
      label: "location",
      type: "text",
      placeholder: "Ariana",
      },
      {
        id: 5,
      label: "remise",
      type: "text",
      placeholder: "20",
      },
      
      {
        id: 6,
      label: "entryfee",
      type: "text",
      placeholder: "10",
      },
    {
        id: 7,
      label: "status_shop",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
       
      ],
    },
    {
      id: 8,
    label: "owner",
    type: "select",
    options: [
      { value: "active", label: "test@gmail.com" },
      { value: "inactive", label: "teeest@gmail.com" },
     
    ],
  },
  ];
  const ownerInput = inputs.find(input => input.label === 'owner');
  ownerInput.options = ownerOptions;

  const psoi = (pos) => {
    console.log("lata", pos);
    setFormInputs({ ...formInputs, position: pos });
  };

  const handleOptionChange = (e, label) => {
    setFormInputs({ ...formInputs, [label]: e.target.value });
  };

  const handleChange = (e, label) => {
    setFormInputs({ ...formInputs, [label]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name_shop,
      email,
      phone_number,
      location,
      remise,
      entryfee,
      status_shop,
      owner,
      position,
    } = formInputs;
    console.log(formInputs)
    if (
      !name_shop ||
      !email ||
      !phone_number ||
      !location ||
      !remise ||
      !entryfee ||
      !status_shop ||
      !owner
    ) {
      alert("All fields must be filled out");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert("Email is not valid");
      return;
    }

    if (!position.lat || !position.lng) {
      alert("Position must be set");
      return;
    }

    // Submit form
    console.log("Form submitted", formInputs);
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
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              {inputs.map((input) =>
                  input.type === "select" ? (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <select
                        value={formInputs[input.label]}
                        onChange={(e) => handleChange(e, input.label)}
                        data-name={input.name}
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
                        value={formInputs[input.label]}
                        name={input.name}
                        onChange={(e) => handleChange(e, input.label)}
                      />
                    </div>
                  )
                )}
              </div>
              <div>
                <LocationInput setPosition={(pos) => psoi(pos)} />
              </div>
              <button style={{ alignSelf: "center" }}>Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewShop;
