import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesourceChain";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "../../api/axios";
const url = process.env.REACT_APP_URL;
const DatatableChains = ({chain}) => {
  const [data, setData] = useState(userRows);
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';
  const [message, setMessage] = useState("");
  const [result, setResult] = useState([{
          
    idUser:"",
    id: "",
    chainname: "",
    img: "",
    owner: "",
}]);

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`/api/professional/deletechain`, {
      data: { chainId: id },
    });

    alert(response.data.message);
    setResult(result.filter((item) => item.idUser !== id));
  } catch (error) {
    console.error('Error:', error);
    if (error.response) {
      alert("Error occurred while deleting chain: " + error.response.data.error);
    } else {
      alert("Error occurred while deleting chain");
    }
  }
};


  
 
  useEffect(() => {
    if (chain) {
     let id=1;
     const updatedData = chain.map((item) => {
      return {
          idUser:item._id,
          id: id++,
          chainname: item.chain_name,
          img: item.chain_image ? url + "/uploads/" + item.chain_image: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
          owner: item.owner.lastName +" "+item.owner.firstName,
      };
    })
      setResult(updatedData);
      console.log("Component rendered with updated mapUser prop");
    }
  }, [chain]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/products/chain/${params.row.idUser}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {isAdmin && ( // Show "Delete" and "Edit" buttons only for the admin
              <>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.idUser)}
                >
                  Delete
                </div>
                <Link to={`/chains/chain/edit/${params.row.idUser}`} style={{ textDecoration: "none" }}>
                  <div className="EditButton">Edit</div>
                </Link>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Chains
        {isAdmin && ( // Show "Add New Chain" link only for the admin
          <Link to="/chains/new" className="link">
            Add New Chain
          </Link>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={result}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};


export default DatatableChains;
