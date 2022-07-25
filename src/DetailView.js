import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import Cart from "./Cart";

import "./DetailView.scss";

export default function DetailView(props) {
    const params = useParams();
    const [data, setData] = useState({});

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
    <div className="wrapper">
        <div className="component-sidebar">
            <Link to={"/"}>
                <h1>EFEB</h1>
            </Link>
        </div>
        <div className="component-main">
            <div className="product-detail">
                <div className="product-information">
                    <img width="300px" src={data.picture} alt={`${data.display_name}`}/>
                    <h2>{data["display_name"]}</h2>

                    <div>£{data["price"]} ({data.stock_count} in stock)</div>
                    {data.manufacturer && data.manufacturer["display_name"]}
                    {data.categories && data.categories.map(category => (
                        <div key={category.slug}>{category.display_name}</div>
                    ))}
                    { canAdd(data) &&
                    <button onClick={handleAddToCart} value={JSON.stringify(data)}>Add</button>
                    }
                    { canRemove(data) &&
                    <button onClick={handleRemoveFromCart} value={JSON.stringify(data)}>Remove</button>
                    }
                </div>
                <div className="product-description">
                    <div>{data.description}</div>
                    <div>{data.links}</div>
                </div>
            </div>
        </div>
        <Cart items={props.items} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
    </div>
  )
}
