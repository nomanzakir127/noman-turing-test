/* eslint-disable jsx-a11y/anchor-is-valid */

import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/AuthenticationService";
import "./header.css"


function Header() {

  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate("/")
  }
  return (
    <div>
        <nav className="navbar justify-content-between">
            <a className="navbar-brand ms-4 heading">Turing technologies</a>
            <button className="btn btn-outline-success me-3" type="button" onClick={()=>handleLogout()}>Log out</button>
        </nav>
    </div>
    
  );
}

export default Header;
