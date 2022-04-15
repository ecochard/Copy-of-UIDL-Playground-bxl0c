import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import store from "../store";

// please come with me in uidlPlayrounf
// Sure thing!

const Menu = () => {
  // improved navigation mechanism
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // on refresh, display last seen page
    history.push(store.router.url.value || "/");
  }, []);

  useEffect(() => {
    // save in the store (and local storage last seen page)
    store.router.url.next(location.pathname);
  }, [location]);

  return (
    <div
      style={{
        height: 32,
        alignItems: "center",
        marginBottom: 12,
        borderBottom: "solid 1px #ccc",
        display: "flex",
        backgroundColor: "#ccc",
      }}
    >
      <Link to="/">
        <div
          style={{
            height: 32,
            transition: "all 0.3s",
            padding: "8px 16px",
            backgroundColor: location.pathname === "/" ? "#fff" : "",
          }}
        >
          Home
        </div>
      </Link>
      <Link to="/uidl">
        <div
          style={{
            height: 32,
            padding: "8px 16px",
            transition: "all 0.3s",
            backgroundColor: location.pathname === "/uidl" ? "#fff" : "",
          }}
        >
          UIDL
        </div>
      </Link>
    </div>
  );
};

export default Menu;
