import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo.png';
import Logout from '../../05ReusableComponents/Logout';

export default function ManagerNavBar(props) {
  return (
    <div className="pb-4" >
      <nav className="navbar navbar-expand-xl py-4 navbar-light bg-light">

        <div className="container">

          <NavLink className="navbar-brand" to={"/home"}>
            <img className="nav-img" src={logo} alt="logotipas" loading="lazy" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Navigacija"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center">

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navManagerKindergartenList"
                  to={"/darzeliai"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Darželių sąrašas
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navManagerApplicationQueue"
                  to={"/eile"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Registracijų prašymai
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navManagerMap"
                  to={"/zemelapis"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Darželių žemėlapis
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navManagerCompensationQueue"
                  to={"/kompensacijos"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Kompensacijų prašymai
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navManagerApplicationStats"
                  to={"/statistika"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Registracijų statistika
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navManagerDocuments"
                  to={"/pazymos"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Prašymų pažymos
                </NavLink>
              </li>

              <li className="nav-item me-1">
                <NavLink
                  className="nav-link"
                  id="navManagerMyAccount"
                  to={"/profilis/atnaujinti"}
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >Mano paskyra
                </NavLink>
              </li>

              <li className="nav-item nav-item me-1 my-2" id="navManagerLogout">
                <Logout />
              </li>

            </ul>

          </div>
        </div>
      </nav>
      <div>{props.children}</div>
    </div >
  );
}