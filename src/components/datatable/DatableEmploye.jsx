import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../sourceEmploye";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "../../api/axios";

const DatatableEmploye= ({emp,idSellingPoint}) => {
  const [data, setData] = useState(userRows);
  const [result, setResult] = useState([{
    id: "",
    username: "",
    img: "",
    status: "",
    email: "",
    age: 35,
  },]);
  const url = process.env.REACT_APP_URL;
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (emp) {
      console.log(emp)
      console.log(typeof emp)
     let id=1;
      const updatedData = emp.map((item) => {
        
        return {
          
            idUser:item._id,
            id: id++,
            username: item.firstName+" "+item.lastName,
            img: item.image ? url + "/uploads/" + item.image: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            status:  item.status=== "true" ? "active": "inactive",
            email: item.email,
            age: 35,
          
            };
      });

      setResult(updatedData);
      console.log(updatedData);
      console.log("Component rendered with updated mapUser prop");
    }
  }, [emp, url]);


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
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link  to="/products/shop/employe/edit/test" style={{textDecoration:"none"}}>
            <div className="EditButton">Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Emplyees
        <Link to={`/products/${idSellingPoint}/newEmploye`} className="link">
          Add New Employee
        </Link>
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

export default DatatableEmploye;