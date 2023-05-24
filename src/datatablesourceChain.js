export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "chainname",
      headerName: "Chain name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.chainname}
          </div>
        );
      },
      
    },
    {
        field: "owner",
        headerName: "Owner name",
        width: 150,
      },
     

      
      

      
    
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      chainname:"Plan B",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      owner: "Eya Belkadhi",
      
      
    },
    {
      id: 2,
      chainname:"Chaneb Tacos",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      owner: "Eya Belkadhi",
      
    },
    
    
   
  ];