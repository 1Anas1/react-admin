export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
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
        width: 200,
      },

    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 100,
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
      age: 35,
      statusaccount  : "active",
      statusbraclet :"active",
    },
    {
      id: 2,
      firstname: "Jamie",
      lastname:"kik",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "2snow@gmail.com",
      age: 42,
      statusaccount  : "active",
      statusbraclet :"active",
    },
    {
      id: 3,
      firstname: "Lannister",
      lastname: "Lannister4",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "3snow@gmail.com",
      age: 45,
      statusaccount  : "active",
      statusbraclet :"active",
    },
    {
      id: 4,
      firstname: "Stark",
      lastname: "Stark",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "4snow@gmail.com",
      age: 16,
      statusaccount  : "active",
      statusbraclet :"active",
    },
    {
      id: 5,
      firtsname: "Targaryen",
      lastname: "Targaryen",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "5snow@gmail.com",
      age: 22,
      statusaccount  : "active",
      statusbraclet :"active",
    },
    {
      id: 6,
      firstname: "Melisandre",
      lastname: "Melisandre",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "6snow@gmail.com",
      age: 15,
      statusaccount  : "active",
      statusbraclet :"active",
    },
    {
      id: 7,
      fisrtname: "Clifford",
      lastname: "Clifford",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "7snow@gmail.com",
     
      age: 44,
      statusaccount  : "active",
      statusbraclet :"active",
    },
    {
      id: 8,
      fisrtname: "Frances",
      lastname: "Frances",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "8snow@gmail.com",

      age: 36,
      statusaccount  : "active",
      statusbraclet :"active",
    },
    {
      id: 9,
      fisrtname: "Roxie",
      lastname: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      
      age: 65,
      statusaccount  : "active",
      statusbraclet :"active",
    },
    {
      id: 10,
      firstname: "Roxie",
      lastname: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      age: 65,
      statusaccount  : "active",
      statusbraclet :"active",
    },
  ];