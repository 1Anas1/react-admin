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
        
        username:item.user ?item.user.firstName:"amine",
        typeuser:item.user ? item.user.role.name:"member",
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
      columns={userColumns}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
    />
     )} 
    </div>
  );
};

export default DatatableOrders;
