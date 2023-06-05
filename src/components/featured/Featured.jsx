import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import axios from "../../api/axios";
import React, { useEffect, useState } from 'react';
const Featured = () => {
  const [transferPercentage, setTransferPercentage] = useState(0);
  const [totalTransfers, setTotalTransfers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const role =localStorage.getItem('role');
  useEffect(() => {
    const getTransferPercentage = async () => {
      try {
        setIsLoading(true); // Définit isLoading sur true
    
        const res = await axios.get('/calculateTransferPercentage');
        console.log(res.data); // Affichez la réponse de l'API pour vérifier
        setTransferPercentage(res.data.transferPercentage);
        setTotalTransfers(res.data.totalTransfers);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // Définit isLoading sur false
      }
    };
    getTransferPercentage();
    
  }, []);

  return (
    <div className="featured">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
        
          {role === 'admin' && (
            <>
              <div className="top">
            <h1 className="title">Total Revenue</h1>
            <MoreVertIcon fontSize="small" />
          </div>
              <div className="bottom">
                <div className="featuredChart">
                  {console.log(transferPercentage, 'test')}
                  <CircularProgressbar value={transferPercentage} text={`${transferPercentage}%`} strokeWidth={5} />
                </div>
                <p className="title">Total transfers made</p>
                <p className="amount">{totalTransfers}</p>
              </div>
            </>
          )}
          {role === 'professional' && (
            <>
              {/* Add specific fields for professionals */}
            </>
          )}
        </div>
      )}
    </div>
  );
  
};

export default Featured;
