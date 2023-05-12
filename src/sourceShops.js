export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "nameshop",
      headerName: "Name Shop",
      width: 230,
      
    },
    {
        field: "owner",
        headerName: "Owner",
        width: 100,
      },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "phone",
      headerName: "phone",
      width: 100,
    },
    {
        field: "location",
        headerName: "location",
        width: 100,
      },
      {
        field: "remise",
        headerName: "remise",
        width: 100,
      },
      
      {
        field: "entryfee",
        headerName: "entryfee",
        width: 100,
      },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      nameshop: "Snow",
      owner:"eya",
      status: "active",
      email: "1snow@gmail.com",
      remise:20,
      entryfee:20,
      location:'menzah',
      phone:'93765544'
    },
    {
      id: 2,
      nameshop: "Snow",
      owner:"eya",
      status: "active",
      email: "1snow@gmail.com",
      remise:20,
      entryfee:20,
      location:'menzah',
      phone:'93765544'
    },
    {
      id: 3,
      nameshop: "Snow",
      owner:"eya",
      status: "active",
      email: "1snow@gmail.com",
      remise:20,
      entryfee:20,
      location:'menzah',
      phone:'93765544'
    },
    {
      id: 4,
      nameshop: "Snow",
      owner:"eya",
      status: "active",
      email: "1snow@gmail.com",
      remise:20,
      entryfee:20,
      location:'menzah',
      phone:'93765544'
    },
    
  ];
  