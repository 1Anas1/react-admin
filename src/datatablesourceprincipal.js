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
      field: "solde",
      headerName: "Solde",
      width: 80,
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
        field: "statusbracelet",
        headerName: "Status bracelet",
        width: 120,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.statusbraclet}`}>
              {params.row.statusbraclet}
            </div>
          );
        },
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
      statusaccount  : "inactive",
      statusbraclet :"active",
    },
    {
      id: 2,
      firstname: "Jamie",
      lastname:"kik",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "2snow@gmail.com",
    
      statusaccount  : "active",
      statusbraclet :"active",
    },
    {
      id: 3,
      firstname: "Lannister",
      lastname: "Lannister4",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "3snow@gmail.com",
      statusaccount  : "active",
      statusbraclet :"active",
    },
   
   
  ];