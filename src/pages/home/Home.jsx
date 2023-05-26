import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';
  const isProfessional = role === 'professional';

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {isAdmin && (
            <>
              <Widget type="user" />
              <Widget type="order" />
              <Widget type="Member" />
              <Widget type="professional client" />
            </>
          )}
          {isProfessional && ( 
               <>
            <Widget type="user" />
            <Widget type="payment" /></>
          )}
        </div>
        <div className="charts">
          <Featured />
          {/* Ajoutez d'autres composants de chart si nécessaire */}
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};
export default Home;
