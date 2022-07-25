import React, { useEffect } from "react";

export default function SuccessView() {
    useEffect(() => {
        localStorage.setItem("efebCart", []);
    });

    return (
        <div className="component-success">
            <h1>Success!</h1>
            <div>Your order has been placed</div>
        </div >
    );
}
