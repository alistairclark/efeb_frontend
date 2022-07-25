import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./SuccessView.scss";

export default function SuccessView() {
    useEffect(() => {
        localStorage.setItem("efebCart", []);
    });

    return (
        <div className="wrapper">
            <div className="component-sidebar">
                <Link to={"/"}>
                    <h1>EFEB</h1>
                </Link>
            </div>
            <div className="component-main">
                <div className="success">
                    <h1>🤘 Order placed 🤘</h1>
                    <div>Your order has been placed. You will receive a confirmation email shortly.</div>
                </div>
            </div >
        </div>
    );
}
