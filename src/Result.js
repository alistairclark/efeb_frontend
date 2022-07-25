import React  from "react";
import { Link } from "react-router-dom";

import "./Result.scss";

export default function Result (props) {
    const handleAddToCart = event => {
        props.addToCart(event);
    };

   const handleRemoveFromCart = event => {
        props.removeFromCart(event);
    };

    return (
        <div className="component-result-row">
            <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/products/${props.slug}/`}
            >
                <img height="200" src={props.picture} alt={`${props.display_name}`}/>
            </Link>
            <h2>{props.display_name}</h2>
            <div>£{props.price} ({props.stock_count} in stock)</div>

            <div className="addRemoveButtons">
                {props.canAdd &&
                    <button className="add" onClick={handleAddToCart} value={JSON.stringify(props.object)}>Add</button>
                }
                {props.canRemove &&
                    <button className="remove" onClick={handleRemoveFromCart} value={JSON.stringify(props.object)}>Remove</button>
                }
            </div>
        </div >
    );
}
