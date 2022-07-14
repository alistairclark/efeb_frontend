import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Cart from "./Cart";

export default function DetailView(props) {
    const params = useParams();
    const [data, setData] = useState(0);

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/products/${params.slug}`
        ).then(
            response => response.json()
        ).then(
            data => setData(data)
        )
    }, [params]);

    const handleAddToCart = event => {
        props.addToCart(event);
    };

    const handleRemoveFromCart = event => {
        props.removeFromCart(event);
    };

    const canAdd = (result) => {
        if (result) {
            if (result.slug in props.items) {
                return props.items[result.slug].quantity < result.stock_count
            } else if (result.stock_count === 0) {
                return false;
            }

            return true;
        }
    }

    const canRemove = (result) => {
        if (result) {
            return result.slug in props.items;
        }
    }

  return (
    <div>
        <h2>{data["display_name"]}</h2>
        <div>Price: £{data["price"]}</div>
        {data.manufacturer && data.manufacturer["display_name"]}
        {data.categories && data.categories.map(category => (
            <div key={category.slug}>{category.display_name}</div>
        ))}
        <img height="200" src={data.picture} alt={`${data.display_name}`}/>
        <div>{data.stock_count} in stock</div>
        <div>{data.description}</div>
        <div>{data.links}</div>
        <div>{data.slug}</div>
        { canAdd(data) &&
        <button onClick={handleAddToCart} value={JSON.stringify(data)}>Add to cart</button>
        }
        { canRemove(data) &&
        <button onClick={handleRemoveFromCart} value={JSON.stringify(data)}>Remove from cart</button>
        }
        <Cart items={props.items} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
    </div>
  )
}
