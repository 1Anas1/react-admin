import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableOrders from "../../components/datatable/DatableOrders"

const ListShops = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableOrders/>
        
      </div>
    </div>
  )
}

export default ListShops