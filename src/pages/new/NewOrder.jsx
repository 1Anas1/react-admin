import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

const NewOrder = ({ title }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const getUsersWithoutBracelets = async () => {
      try {
        const response = await axios.get("/getUsersWithoutBracelets");
        const users = response.data;

        const options = users.map((user) => ({
          value: user._id,
          label: user.email,
        }));

        setUserOptions(options);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsersWithoutBracelets();
  }, []);

  const inputs = [
    {
      id: 1,
      label: "User email",
      name: "userId",
      type: "select",
      options: userOptions.length > 0 ? userOptions : [],
    },
    {
      id: 2,
      label: "Bracelet Type",
      name: "type",
      type: "select",
      options: [
        { value: "Gold", label: "Gold" },
        { value: "Platinum", label: "Platinum" },
      ],
    },
    {
      id: 3,
      label: "Color",
      name: "color",
      type: "select",
      options: [
        { value: "Red", label: "Red" },
        { value: "Blue", label: "Blue" },
        { value: "Green", label: "Green" },
        { value: "Pink", label: "Pink" },
      ],
    },
  ];

  const handleOptionChange = (e, inputId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [inputId]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formInputs = inputs.filter((input) => input.type !== "select");
    const formValues = {};

    formInputs.forEach((input) => {
      const inputValue = e.target.elements[input.name].value;
      formValues[input.name] = inputValue;
    });

    const selectedOptionsObj = inputs.reduce((obj, input) => {
      if (input.type === "select") {
        const selectedValue = selectedOptions[input.id];
        obj[input.name] = selectedValue;
      }
      return obj;
    }, {});

    const requestData = {
      ...formValues,
      ...selectedOptionsObj,
    };
    console.log(requestData);
    try {
      const response = await axios.post("/createBraceletAdmin", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Bracelet created successfully:", response.data);
    } catch (error) {
      console.error("Error creating bracelet:", error);
    }

    setSelectedOptions({});
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
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", alignItems: "center" }}
            >
              {inputs.map((input) =>
                input.type === "select" ? (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <select
                      value={selectedOptions[input.id] || ""}
                      onChange={(e) => handleOptionChange(e, input.id)}
                      data-name={input.name}
                    >
                      <option value="">Select an option</option>
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
                      name={input.name}
                      placeholder={input.label}
                    />
                  </div>
                )
              )}
              <button type="submit">Order</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
