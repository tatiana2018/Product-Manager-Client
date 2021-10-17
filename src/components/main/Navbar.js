import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import { IconContext } from "react-icons";
import AuthContext from "../../context/productContext";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function Navbar() {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const authContext = useContext(AuthContext);
  const { usuario, cerrarSesion } = authContext;

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars padding-botton">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="header-segundario">
            <span className="text-hello">Hola, {usuario.nombres}</span>
            {usuario ? (
              <button className="btn-cerrar" onClick={() => cerrarSesion()}>
                <LockOutlinedIcon />
              </button>
            ) : null}
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
