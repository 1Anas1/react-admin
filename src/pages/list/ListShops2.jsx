import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableShops from "../../components/datatable/DatableShops"

const ListShops = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableShops/>
        
      </div>
    </div>
  )
}

export default ListShops