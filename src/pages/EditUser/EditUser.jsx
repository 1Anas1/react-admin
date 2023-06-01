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
    const [user,setUser]=useState({});
  const [member,setMember]=useState([]);
  const [operation,setOperation]=useState([]);
  const token = localStorage.getItem("accessToken");
  const { userId } = useParams();
  const url = process.env.REACT_APP_URL;
    const [data, setData] = useState([{
      id: "",
      firstname: "",
      lastname:"",
      img: "",
      email: "",
      statusaccount  : "",
      statusbraclet :""
    }]);
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log(userId);
    async function fetchData() {
      try {
        const response = await axios.post("/getUserInfo",{idUser:userId}, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        });
        console.log(response?.data.user);
        setUser(response?.data.user);
        setOperation(response?.data.user.bracelets[0].operations)
        console.log(typeof response?.data.user.children)
        setMember(response?.data.user.children)
        setLoading(false);
      } catch (err) {
        if (!err?.response) {
          console.log('No server response');
        }
      }
    }

    fetchData();
  }, [token]);
    return (
        <div className="useredit">
            <Sidebar/>
            <div className="usercontainer1">
                <Navbar/>
     
                <div className="userTitleContainer">
        <h1 className="userTitle">Profile</h1>
        
      </div>
        <div className="userContainer">
            
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/56828017_850214761982793_7110731517202006016_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aN1vSefHQLwAX_R6gmk&_nc_ht=scontent.ftun16-1.fna&oh=00_AfCKiYkr9FkBZvpYAlXCJMztwOHZTcUCh4jtyoqVlMYutg&oe=649E4156"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">Anass Cherni</span>
                <span className="userShowUserTitle">Principal Users</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">cherni.as</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">cherni.anass02@gmail.com</span>
              </div>
             
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="anass007"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="cherni anass"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="cherni.anass02@gmail.com"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Date of birth</label>
                  <input
                    type="date"
                    
                    className="userUpdateInput"
                  />
                </div>
                <div className='userUpdateItem'>
  <label for="gender">Gender</label>
  <select id="gender">
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</div>

<div className='userUpdateItem'>
  <label for="Status Bracelet">Status bracelet</label>
  <select id="gender">
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