import React from 'react';
import { useHistory } from 'react-router-dom';

import '../../../App.css';

import http from '../../10Services/httpService';
import apiEndpoint from '../../10Services/endpoint';
import AuthContext from "../../11Context/AuthContext";
import swal from 'sweetalert';

export default function Logout() {

  const { dispatch } = React.useContext(AuthContext);
  const history = useHistory();

  const handleLogout = e => {
    http
      .post(`${apiEndpoint}/logout`)
      .then(response => {
        dispatch({
          type: "LOGOUT"
        })
        history.push("/")
      })
      .catch(error => {
        swal({
          text: "Įvyko klaida",
          button: "Gerai"
        })
      });

  }

  return (
    <div>
      <button
        id="btnLogout"
        className="btn btn-outline-primary "
        onClick={handleLogout}
      >Atsijungti
      </button>
    </div>
  )
}
