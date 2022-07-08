import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Cart extends PureComponent {
    static propTypes = {
        items: PropTypes.array,
    };

    calculateTotal() {
        let total = 0

        this.props.items.map(function (item) {
            let result = JSON.parse(item);
            total += parseFloat(result.price);
        })

        return total;
    }

    render() {

        return (
            <div className="cart">
                {this.props.items.map(function (item) {
                    let result = JSON.parse(item)
                    return <div key={result.slug}>{result.display_name} £{result.price}</div>
                })}
                Total: £{this.calculateTotal()}
            </div >
        );
    }
}
