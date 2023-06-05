import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ListShops from "./pages/list/ListShops";
import ListOrders from "./pages/list/ListOrders"
import {userproInputs} from './formsourcepro'
import SingleMember from "./pages/single/SingleMember";
import ListChains from "./pages/list/ListChains";
import SingleShop from "./pages/single/SingleShop";
import SingleClientPro from "./pages/single/SingleClientPro";
import NewPro from "./pages/new/NewPro";
import NewShop from '../src/pages/new/NewShop'
import NewMember from './pages/new/NewMember'
import NewEmploye from "./pages/new/NewEmploye";
import {EmpInputs} from '../src/formsourceEmp';
import SingleEmploye from "./pages/single/SingleEmploye";
import NewOrder from "./pages/new/NewOrder";
import NewChain from './pages/new/NewChain'
import { shopinput } from "./formsourceshop";
import { orderinput } from "./formsourceorder";
import { chaininput } from "./formsourcechain";
import Profil from "./pages/profil/Profil";
import EditUser from './pages/EditUser/EditUser'
import EditShop from './pages/EditUser/EditShop'
import EditUser1 from './pages/EditUser/EditUser1'
import EditEmpo from './pages/EditUser/EditEmpo'
import EditChain from './pages/EditUser/EditChain'
import Editpro from './pages/EditUser/Editpro'
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = localStorage.getItem("accessToken");
  const role =localStorage.getItem('role');
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {!token && <Route index element={<Login />} />}
            {token && <Route index element={<Home />} />}
            {role === "admin" && (
            <>
            
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="edit/:userId">
              <Route index element={<EditUser1/>}/>
              </Route>
              <Route path="member">
              <Route path=":userId" element={<SingleMember/>} />
              <Route path="edit/:userId">
              <Route index element={<EditUser1/>}/>
              </Route>

              <Route path=":userId/newemp" element={<NewMember  title="Add New Principal" />}/>

              </Route>
              <Route path="pro">
              <Route path=":userId" element={<SingleClientPro />} />
              <Route path="edit/:userId">
              <Route index element={<Editpro/>}/>
              </Route>
            
            

              <Route path="new" element={<NewPro title="Add New Client" />} />

              </Route>
              
              <Route
                path="new"
                element={<New  title="Add New Principal" />}
              />
              
             
            </Route>
            <Route path="products">
              <Route index element={<ListShops />} />
              <Route path="chain">

                <Route path=":chainId" element={<ListShops />} />
              </Route>
              <Route path="shop">
              <Route path=":productId" element={<SingleShop />} />
              <Route path="edit/:userId">
              <Route index element={<EditShop/>}/>
              </Route>
              <Route path="employe">
              <Route path="edit/:userId">
              <Route index element={<EditEmpo/>}/></Route>
              </Route>
              </Route>

              
              <Route
                path="new"
                element={<NewShop inputs={shopinput} title="Add New Shop" />}
              />
              <Route
                path=":idSellingPoint/newEmploye"
                element={<NewEmploye title="Add New Employee" />}
              />
              <Route
                path=":idSellingPoint/singlemp"
                element={<SingleEmploye/>}
              />
            </Route>

              
            
            <Route path="Orders">
              <Route index element={<ListOrders />} />
              <Route path="shop">
              <Route path=":orderId" element={<SingleShop />} />
              
              </Route>
              <Route
                path="new"
                element={<NewOrder title="Add New Order" />}
              />
      
      
              
            </Route>
            <Route path="chains">
              <Route index element={<ListChains/>} />
              <Route path="chain">
              <Route path=":orderId" element={<SingleShop />} />
              <Route path="edit/:chainId">
              <Route index element={<EditChain/>}/></Route>
              </Route>
              
              <Route
                path="new"
                element={<NewChain inputs={chaininput} title="Add New Chain" />}
              />
                  
            </Route>
            <Route path="Profil">
              <Route path="edit">
              <Route index element={<EditUser/>}/></Route>
              </Route>
            </>
          )}
            {role === "professional" && (
            <>
              <Route path="Home" element={<Home />} />
              <Route path="products">
              <Route index element={<ListShops />} />
              <Route path="shop">
              <Route path=":productId" element={<SingleShop />} />
              </Route>
              <Route
                path="new"
                element={<NewShop title="Add New Product" />}
              />
              <Route
                path="newEmploye"
                element={<NewEmploye title="Add New Product" />}
              />
              <Route
                path="singlemp"
                element={<SingleEmploye/>}
              />


              
            </Route>
            <Route path="Profil">
              <Route path="edit">
              <Route index element={<EditUser/>}/></Route>
              </Route>

              <Route path="chains">
              <Route index element={<ListChains/>} />
              <Route path="chain">
              <Route path=":orderId" element={<SingleShop />} />
              </Route>
              <Route
                path="new"
                element={<NewChain inputs={chaininput} title="Add New chain" />}
              />
                  
            </Route>
            
            </>
          )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
