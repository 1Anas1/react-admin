import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../../api/axios";
import { userColumns, userRows } from "../../sourceShops";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
const url = process.env.REACT_APP_URL;
const DatatableShops = ({shop}) => {
  const [data, setData] = useState(userRows);
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';
  const [message, setMessage] = useState("");
  const [result, setResult] = useState();
useEffect(() => {
  if (shop) {
   let id=1;
   const updatedData = shop.map((item) => {
    return {
      idUser:item._id,
      id: id++,
      nameshop: item.sp_name,
      owner:item.owner.firstName,
      status: item.payment_requirement,
      email: item.sp_email,
      remise:20,
      entryfee:20,
      location:item.sp_address,
      phone:item.sp_phone
    };
  })
  console.log(updatedData);
    setResult(updatedData);
    console.log("Component rendered with updated mapUser prop");
  }
}, [shop]);

const handleDelete = async (id) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `/api/professional/deleteSellingPoint/${id}`,
      headers: {
        'Content-Type': 'application/json',
        
      }
    });

    console.log(response.data.message);
    setData(data.filter((item) => item.id !== id));
    setMessage("Shop successfully deleted!");
  } catch (error) {
    console.error("Error:", error);

    // Display error message
    setMessage("An error occurred while deleting the shop.");
  }
};


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/products/shop/${params.row.idUser}`} style={{ textDecoration: "none" }}>
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
                <Link to={`/products/shop/edit/${params.row.idUser}`} style={{ textDecoration: "none" }}>
                  <div className="EditButton">Edit</div>
                </Link>
              </>
            )}{message && <div className="message">{message}</div>}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Shops
        {isAdmin && ( // Show "Add New Shop" link only for the admin
          <Link to="/products/new" className="link">
            Add New Shop
          </Link>
        )}
      </div>
     {result && (
      <DataGrid
      className="datagrid"
      rows={result}
      columns={userColumns.concat(actionColumn)}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
    />
     )} 
    </div>
  );
};

export default DatatableShops;