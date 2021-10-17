import React, { Fragment, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Photo from "../../images/avatar.png";
import AuthContext from "../../context/productContext";
import SideNav from "../main/Navbar";

const Profile = () => {
  const authContext = useContext(AuthContext);

  const { usuario } = authContext;
  return (
    <Fragment>
      <SideNav />
      <div className="contenedor-basico-movil float-right sombra-dark">
        <h1 className="text-center">Perfil</h1>
        <div className="container mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-7">
              <div className="card p-3 py-4">
                <div className="text-center">
                  <img className="tamano-foto" src={Photo} />{" "}
                </div>
                <div className="text-center mt-3">
                  {" "}
                  <span className="bg-secondary p-1 px-4 rounded text-white">
                    Pro
                  </span>
                  <h5 className="mt-2 mb-0">{usuario.nombres}</h5>{" "}
                  <span>Software Developer</span>
                  <div className="px-4 mt-1">
                    <p className="fonts">c.c. 1128478748</p>
                    <p>3196852020</p>
                    <p>Cl. 51 Sur #48-57, Itagui,MEDELLIN,</p>
                    <p>ANTIOQUIA, Colombia Cl. 51 Sur #48-57</p>
                  </div>
                  <div className="buttons">
                    {" "}
                    <button className="btn btn-outline-primary px-4">
                      Actualizar
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
