import React, { PureComponent } from "react";

export default class SuccessView extends PureComponent {
    render() {
        return (
            <div className="component-success">
                <h1>Success!</h1>
                <div>Your order has been placed!</div>
            </div >
        );
    }
}
