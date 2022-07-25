import React from "react";
import { Link } from "react-router-dom";

export default function CancelledView() {
    return (
        <div className="wrapper">
            <div className="component-sidebar">
                <Link to={"/"}>
                    <h1>EFEB</h1>
                </Link>
            </div>
            <div className="component-main">
                <div className="success">
                    <h1>Your order has been cancelled</h1>
                </div>
            </div >
        </div>
    );
}
