import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import { Link } from "react-router-dom";
  import "./EditUser.scss";
  import Navbar from "../../components/navbar/Navbar";
  import Sidebar from "../../components/sidebar/Sidebar";
  
  export default function User() {
    return (
        <div className="useredit">
            <Sidebar/>
            <div className="usercontainer1">
                <Navbar/>
     
                <div className="userTitleContainer">
        <h1 className="userTitle">Profile</h1>
        
      </div>
        <div className="userContainer">
            
          <div className="userShowEdit">
            <div className="userShowTop">
              <img
                src="https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/56828017_850214761982793_7110731517202006016_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aN1vSefHQLwAX_R6gmk&_nc_ht=scontent.ftun16-1.fna&oh=00_AfCKiYkr9FkBZvpYAlXCJMztwOHZTcUCh4jtyoqVlMYutg&oe=649E4156"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">Chaneb Tacos</span>
                <span className="userShowUserTitle">Shop</span>
              </div>
            </div>
            
            
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Name shop</label>
                  <input
                    type="text"
                    placeholder="anass007"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="cherni anass"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="cherni.anass02@gmail.com"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Remise</label>
                  <input
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Entryfee</label>
                  <input
                    type="date"
                    
                    className="userUpdateInput"
                  />
                </div>
                


<div className='userUpdateItem'>
  <label for="status shop">Status shop</label>
  <select id="status shop" className="selectinfo">
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
</div>


   
    
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/56828017_850214761982793_7110731517202006016_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aN1vSefHQLwAX_R6gmk&_nc_ht=scontent.ftun16-1.fna&oh=00_AfCKiYkr9FkBZvpYAlXCJMztwOHZTcUCh4jtyoqVlMYutg&oe=649E4156"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    
    );
  }