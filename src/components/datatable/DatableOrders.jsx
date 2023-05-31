import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../sourceOrders";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

const DatatableOrders = ({order}) => {
  const [data, setData] = useState(userRows);
  const [result, setResult] = useState();
  useEffect(() => {
    if (order) {
     let id=1;
     const updatedData = order.map((item) => {
      return {
        idUser:item._id,
        id: id++,
<<<<<<< HEAD
        username:item.user.firstName+" "+item.lastName, 
        typeuser:item.user.role.name,
=======
        username:item.user ?item.user.firstName:"test",
        typeuser:item.user ? item.user.role.name:"test",
>>>>>>> 76cbde848774ac4c02ab50216419ef7ce4b7d51e
        typebracelet:item.type,
        colorbracelet:item.color,
      };
    })
    console.log(updatedData);
      setResult(updatedData);
      console.log("Component rendered with updated mapUser prop");
    }
  }, [order]);
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
          
    
            
            <Link to={`/Orders/${params.row.idUser}`} style={{textDecoration:"none"}}>
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
        Orders
        <Link to="/Orders/new" className="link">
          Add New Order
        </Link>
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

export default DatatableOrders;
