import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../sourceShops";
import { Link } from "react-router-dom";
import { useState } from "react";

const DatatableShops = () => {
  const [data, setData] = useState(userRows);
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';

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
            <Link to="/products/shop/test" style={{ textDecoration: "none" }}>
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
                <Link to="/products/new" style={{ textDecoration: "none" }}>
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
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableShops;