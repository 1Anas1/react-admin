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
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="Home" element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="member">
              <Route path=":userId" element={<SingleMember/>} />
              <Route path="newemp" element={<NewMember inputs={userproInputs} title="Add New User" />}/>
              </Route>
              <Route path="pro">
              <Route path=":userId" element={<SingleClientPro />} />
              </Route>
              <Route path="pro">
              <Route path="new" element={<NewPro inputs={userproInputs} title="Add New User" />} />
              </Route>
              
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
              
             
            </Route>
            <Route path="products">
              <Route index element={<ListShops />} />
              <Route path="shop">
              <Route path=":productId" element={<SingleShop />} />
              </Route>
              <Route
                path="new"
                element={<NewShop inputs={productInputs} title="Add New Product" />}
              />
              <Route
                path="newEmploye"
                element={<NewEmploye inputs={EmpInputs} title="Add New Product" />}
              />
              <Route
                path="singlemp"
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
                element={<NewOrder inputs={productInputs} title="Add New Product" />}
              />
      

              
            </Route>
            <Route path="chains">
              <Route index element={<ListChains/>} />
              <Route path="chain">
              <Route path=":orderId" element={<SingleShop />} />
              </Route>
              <Route
                path="new"
                element={<NewChain inputs={productInputs} title="Add New Product" />}
              />
      

              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
