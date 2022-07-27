import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";

import '../styles/navbar.css';
import mainLogo from "../assets/main_logo.png";

const Navbar = () => {

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact="true" to="/home">
                        <div className="logo_navbar">
                            <img src={mainLogo} alt="logo_groupomania" />
                        </div>
                    </NavLink>
                </div>
                <div className="welcome">
                    <h5>Bienvenue sur l'intranet</h5>
                </div>
                <div className="logout">
                  <Logout/>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;