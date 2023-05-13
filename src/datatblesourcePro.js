export const userColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "firstname",
      headerName: "First name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.firstname}
          </div>
        );
      },
    },
    {
        field: "lastname",
        headerName: "Last name",
        width: 170,
      },

    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 70,
    },

    {
      field: "statusaccount",
      headerName: "Status account",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.statusaccount}`}>
            {params.row.statusaccount}
          </div>
        );
      },
    },

    {
        field: "endcontract",
        headerName: "End Contract",
        width: 100,
      },

   
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      firstname: "Snow",
      lastname:"loli",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "1snow@gmail.com",
      age: 35,
      statusaccount  : "active",
      endcontract:"15/3/2023"
      
    },
  ];