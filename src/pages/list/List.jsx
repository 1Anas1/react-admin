import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import DatatableClientPro from "../../components/datatable/DatableClientPro";

const LOGIN_URL = "/api/professional/getAllUser";

const List = () => {
  const [data, setData] = useState([{
    id: "",
    firstname: "",
    lastname:"",
    img: "",
    email: "",
    solde:"",
    statusaccount  : "",
    statusbraclet :""
  }]);
  const [datapro, setDatapro] = useState([{
    id: "",
      firstname: "",
      lastname:"",
      img: "",
      email: "",
      statusaccount  : "",
      endcontract:""
  }]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(LOGIN_URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        });
        let mem=response?.data.member;
        
        setData(response?.data.member);
        setDatapro(response?.data.professional)
        setLoading(false);
      } catch (err) {
        if (!err?.response) {
          console.log('No server response');
        }
      }
    }

    fetchData();
  }, [token]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Datatable member={data} />
            <DatatableClientPro pro={datapro} />
          </>
        )}
      </div>
    </div>
  );
};

export default List;
