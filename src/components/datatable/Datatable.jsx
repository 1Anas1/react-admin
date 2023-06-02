import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesourceprincipal";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "../../api/axios";
const Datatable = ({member}) => {
  const [data, setData] = useState(userRows);
  const [result, setResult] = useState([{
          
    idUser:"",
    id: "",
    chainname: "",
    img: "",
    owner: "",
}]);
  console.log(member,data)
 // import axios at the top of your file


// Inside your Datatable component
const handleDelete = async (id) => {
  try {
      const response = await axios({
          method: 'post',
          url: `/deleteparent/${id}`, 
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.status === 200) {
          setResult(result.filter((item) => item.idUser !== id));
      } else {
          console.error("Error deleting user: ", response);
      }
  } catch (error) {
      console.error("Error deleting user: ", error);
  }
};


// ... rest of your code

  const url = process.env.REACT_APP_URL;
  useEffect(() => {
    if (member) {
     let id=1;
     const updatedData = member.map((item) => {
      return {
          idUser:item.idUser,
          id: id++,
          firstname: item.firstname,
          lastname:item.firstname,
          img: item.img ? url + "/uploads/" + item.img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
          email: item.email ,
          statusaccount:item.statusaccount,
          statusbraclet :item.statusbraclet
      };
      
    })
      
      setResult(updatedData);
      console.log("Component rendered with updated mapUser prop");
    }
  }, [member]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        console.log(params)
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.idUser}`}  style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.idUser)}
            >
              Delete
            </div>
            <Link to={`/users/edit/${params.row.idUser}`} style={{textDecoration:"none"}}>
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
    Principal Users
        <Link to="/users/new" className="link">
          Add New Principal
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

export default Datatable;
