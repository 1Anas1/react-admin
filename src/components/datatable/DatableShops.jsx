import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../sourceShops";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
const url = process.env.REACT_APP_URL;
const DatatableShops = ({shop}) => {
  const [data, setData] = useState(userRows);
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';
  const [result, setResult] = useState();
useEffect(() => {
  if (shop) {
   let id=1;
   const updatedData = shop.map((item) => {
    return {
      idUser:item._id,
      id: id++,
      nameshop: item.sp_name,
      owner:"eya",
      status: "active",
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

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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
                  onClick={() => handleDelete(params.row.id)}
                >
                  Delete
                </div>
                <Link to={`/products/shop/edit/${params.row.idUser}`} style={{ textDecoration: "none" }}>
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