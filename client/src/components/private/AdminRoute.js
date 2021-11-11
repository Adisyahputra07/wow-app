import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../context/userContext";

/**
 * Wrapper component to protect particular route
 * we use conditional rendering base on state to check
 * if there is user login or not
 * if login: render Component
 * if not: redirect to home path
 */
const AdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          state.isLogin && state.user.roleId === 2 ? (
            <Component {...props} />
          ) : state.isLogin && state.user.role_id === 1 ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/income-transaction" />
          )
        }
      />
    </>
  );
};

export default AdminRoute;
