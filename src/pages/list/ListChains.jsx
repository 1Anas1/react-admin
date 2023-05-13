import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import DatatableChains from "../../components/datatable/DatatableChains"

const ListChains = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableChains/>
        
      </div>
    </div>
  )
}

export default ListChains