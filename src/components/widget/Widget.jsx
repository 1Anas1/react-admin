import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import React, { useEffect, useState } from 'react';
import axios from "../../api/axios";
const Widget = ({ type }) => {
  let data;

  // Define state variables
  const [amount, setAmount] = useState(0);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    // Define a function that fetches the data from the server
    async function fetchData() {
      try {
        let response;

        switch (type) {
          case 'user':
            response = await axios.get('http://127.0.0.1:8003/getTotalMemberCount'); 
            break;
          case 'order':
            response = await axios.get('http://127.0.0.1:8003/getTotalBraceletCount');
            break;
          case 'Member':
            response = await axios.get('http://127.0.0.1:8003/getTotalChildCount');
            break;
          case 'professional client':
            response = await axios.get('http://127.0.0.1:8003/getTotalProCount');
            break;
            case 'shops':
             response = await axios.get(`/calculateSellingPointCountByOwner`, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: false,
              });
              
              
          
        
            
              
              break;
              case 'chain':
                response = await axios.get(`/calculateChainCountByOwner`, {
                   headers: {
                     'Content-Type': 'application/json',
                     Authorization: `Bearer ${token}`,
                   },
                   withCredentials: false,
                 });
                 
                 
             
           
               
                 
                 break;
          default:
            break;
        }
      
        if(response.status === 200) {
          
          const count = response.data;
          setAmount(count);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    // Call the function to fetch the data
    fetchData();
  }, [type]);
  //temporary
 
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        amount:amount,
        isMoney: false,
        
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        amount:amount,
        
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "Member":
      data = {
        title: "MEMBERS",
        isMoney: false,
        amount:amount,
        
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "professional client":
      data = {
        title: "PROFESSIONAL CLIENT",
        isMoney: false,
        amount:amount,
       
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
      case "chain":
        
        data = {
          title: "Chain",
          isMoney: false,
          amount:amount,
          
          icon: (
            <MonetizationOnOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
              }}
            />
          ),
        };
        break;
        case "shops":
          
          data = {
            title: "Shops",
            isMoney: false,
            amount:amount,
            
            icon: (
              <MonetizationOnOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(128, 0, 128, 0.2)",
                  color: "purple",
                }}
              />
            ),
          };
          break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
