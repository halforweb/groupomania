import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";

import '../styles/navbar.css';
import mainLogo from "../assets/main_logo.png";


const Navbar = () => {

    const userData = useSelector((state) => state.userReducer);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact="true" to="/home">
                        <div className="logo_navbar">
                            <img className="logo-navbar-image" src={mainLogo} alt="logo_groupomania" />
                        </div>
                    </NavLink>
                </div>
                <div className="welcome">
                    <h5>Bienvenue sur l'intranet {userData.pseudo}</h5>
                </div>
                <div className="logout">
                  <Logout/>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;