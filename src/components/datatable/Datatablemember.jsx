import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesourceprincipal";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "../../api/axios";

const Datatablemember = ({member}) => {
  const [data, setData] = useState(userRows);
  const [result, setResult] = useState([{
          
    id: "",
    firstname: "",
    lastname:"",
    img: "",
    email: "",
    statusaccount  : "",
    statusbraclet :"",
}]);
  const url = process.env.REACT_APP_URL;
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (member) {
      console.log(member)
      console.log(typeof member)
     let id=1;
      const updatedData = member.map((item) => {
        return {
            idUser:item._id,
            id: id++,
            firstname: item.firstName,
            lastname:item.lastName,
            img: item.image ? url + "/uploads/" + item.image: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: item.email,
            statusaccount  : item.status=== "true" ? "active": "inactive",
            statusbraclet :item.bracelets[0].is_disabled? "active":"inactive",
        };
      });

      setResult(updatedData);
      console.log(updatedData);
      console.log("Component rendered with updated mapUser prop");
    }
  }, [member, url]);

 

const handleDelete = async (id) => {
  try {
    const response = await axios.post(`/deletechild`, {
      childId: id,
      parentId: 'your_parent_id' // You need to determine how to get the parent ID
    });

    console.log(response.data.message);
    setData(data.filter((item) => item.id !== id));
    setMessage(response.data.message); // Display the message returned by the server
  } catch (error) {
    console.error('Error:', error);
    setMessage('Failed to delete member'); // Display an error message
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
            <Link to={`/users/member/${params.row.idUser}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.idUser)}
            >
              Delete
            </div>
            <Link to={`/users/member/edit/${params.row.idUser}`} style={{textDecoration:"none"}}>
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
      Members
        <Link to="/users/member/newemp" className="link">
          Add New Member
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

export default Datatablemember;