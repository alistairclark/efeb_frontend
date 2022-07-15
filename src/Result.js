import React  from "react";
import { Link } from "react-router-dom";

export default function Result (props) {
    const handleAddToCart = event => {
        props.addToCart(event);
    };

   const handleRemoveFromCart = event => {
        props.removeFromCart(event);
    };

    return (
        <div className="component-result-row">
            <div>{props.display_name}</div>
            <div>Manufacturer: {props.manufacturer}</div>
            {props.categories.map(category => (
                <div key={category.slug}>{category.display_name}</div>
            ))}
            <div>{props.price}</div>
            <img height="200" src={props.picture} alt={`${props.display_name}`}/>
            <div>{props.stock_count} in stock</div>
            <div>{props.description}</div>
            <div>{props.links}</div>
            <div>{props.slug}</div>
            {props.canAdd &&
                <button onClick={handleAddToCart} value={JSON.stringify(props.object)}>Add to cart</button>
            }
            {props.canRemove &&
                <button onClick={handleRemoveFromCart} value={JSON.stringify(props.object)}>Remove from cart</button>
            }

            <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/products/${props.slug}/`}
            >
                See more
            </Link>
        </div >
    );
}
