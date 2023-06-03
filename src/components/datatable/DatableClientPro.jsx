import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatblesourcePro";

import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
const DatatableClientPro = ({pro}) => {
  const [data, setData] = useState(userRows);
  const [result, setResult] = useState([{
          
    idUser:"",
    id: "",
    chainname: "",
    img: "",
    owner: "",
}]);
  console.log(pro,data)
  const handleDelete = (id) => {
    setData(pro.filter((item) => item.id !== id));
  };
  const url = process.env.REACT_APP_URL;
  useEffect(() => {
    if (pro) {
     let id=1;
     const updatedData = pro.map((item) => {
      console.log(url + "/uploads/" + item.img)
      return {
          idUser:item.idUser,
          id: id++,
          firstname: item.firstname,
          lastname:item.firstname,
          img: item.img ? url + "/uploads/" + item.img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
          email: item.email ,
          statusaccount:item.statusaccount,
          
      };
      
    })
      console.log(updatedData);
      setResult(updatedData);
      console.log("Component rendered with updated mapUser prop");
    }
  }, [pro]);

 
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/pro/view" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link to={`/users/pro/edit/${params.row.idUser}`} style={{textDecoration:"none"}}>
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
        Professional Clients
        <Link to="/users/pro/new" className="link">
          Add New Client
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

export default DatatableClientPro;