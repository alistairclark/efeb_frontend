import { Link } from "react-router-dom";

import "./MobileMenu.scss";

export default function MobileMenu(props) {
    return (
        <div className="mobile-menu-wrapper">
            <div className="mobile-menu">
                <div className="mobile-title">
                    <Link to={"/"}>
                        <h1>EFEB</h1>
                    </Link>
                </div>
                <button className="mobile-menu-button"><h2>Menu</h2></button>
            </div>
        </div>
    );
}
