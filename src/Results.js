import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Result from "./Result";

export default class Results extends PureComponent {
    static propTypes = {
        results: PropTypes.array,
        addToCart: PropTypes.func,
        removeFromCart: PropTypes.func,
        cartItems: PropTypes.object
    };

    canAdd(result) {
        if (result.slug in this.props.cartItems) {
            return this.props.cartItems[result.slug].quantity < result.stock_count
        } else if (result.stock_count === 0) {
            return false;
        }

        return true;
    }

    canRemove(result) {
        return result.slug in this.props.cartItems;
    }

    render() {
        return (
            <div className="component-results">
                {this.props.results.map(result => (
                    <div key={result.slug}>
                        <Result
                            display_name={result.display_name}
                            manufacturer={result.manufacturer.display_name}
                            categories={result.categories}
                            price={result.price}
                            picture={result.picture}
                            stock_count={result.stock_count}
                            description={result.description}
                            links={result.links}
                            slug={result.slug}
                            canAdd={this.canAdd(result)}
                            addToCart={this.props.addToCart}
                            canRemove={this.canRemove(result)}
                            removeFromCart={this.props.removeFromCart}
                            object={result}
                        />
                    </div>
                ))}
            </div>
        );
    }
}
