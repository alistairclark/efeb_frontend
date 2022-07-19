import React from "react";
import Result from "./Result";

export default function Results(props) {
    const canAdd = (result) => {
        if (result.slug in props.cartItems) {
            return props.cartItems[result.slug].quantity < result.stock_count
        } else if (result.stock_count === 0) {
            return false;
        }

        return true;
    }

    const canRemove = (result) => {
        return result.slug in props.cartItems;
    }

    return (
        <div className="component-results">
            {props.results.map(result => (
                <div className="result" key={result.slug}>
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
                        canAdd={canAdd(result)}
                        addToCart={props.addToCart}
                        canRemove={canRemove(result)}
                        removeFromCart={props.removeFromCart}
                        object={result}
                    />
                </div>
            ))}
        </div>
    );
}
