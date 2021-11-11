import React from "react";
import { UserContext } from "./context/userContext";
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./config/api";
import { Switch, Route, useHistory } from "react-router-dom";
import PrivateRoute from "./components/private/PrivateRoute";
import AdminRoute from "./components/private/AdminRoute";

// component
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import PageSubscribe from "./pages/PageSubscribe/PageSubscribe";
import Profile from "./pages/Profile/Profile";
import IncomeTransaction from "./pages/IncomeTransaction/IncomeTransaction";
import AddBook from "./pages/AddBook/AddBook";
import DetailReadbook from "./pages/DetailReadbook/DetailReadbook";
import ReadBook from "./pages/read-books/ReadBook";
import { HomeAdmin } from "./pages/HomeAdmin/HomeAdmin";

// FakeData

function App() {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const checkUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }

      setAuthToken(token);

      const getProfile = await API.get("/profile");

      dispatch({
        type: "AUTH_SUCCESS",
        payload: { ...getProfile.data.data },
      });

      history.push(getProfile.data.data.roleId === 1 ? "/home" : "/income-transaction");
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/subscribe" component={PageSubscribe} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/detail-readbook/:id" component={DetailReadbook} />
        <PrivateRoute exact path="/readbook/:id" component={ReadBook} />
        <AdminRoute exact path="/income-transaction" component={IncomeTransaction} />
        <AdminRoute exact path="/add-book" component={AddBook} />
        <AdminRoute exact path="/home-admin" component={HomeAdmin} />
      </Switch>
    </div>
  );
}

export default App;
