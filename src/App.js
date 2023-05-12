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
import SinglePro from "./pages/single/SinglePro";
import SingleShop from "./pages/single/SingleShop";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="pro">
              <Route path=":userId" element={<SinglePro />} />
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
                element={<New inputs={productInputs} title="Add New Product" />}
              />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
