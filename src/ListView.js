import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Results from "./Results";
import Cart from "./Cart";

export default function ListView (props) {
    const [results, setResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [query, setQuery] = useState("");

    const handleManufacturerChange = event => {
        if (event.target.checked) {
            setManufacturers(manufacturers.concat([event.target.value]));
        } else {
            setManufacturers(manufacturers.filter(element => element !== event.target.value));
        }
    };

    const handleCategoriesChange = event => {
        if (event.target.checked) {
            setCategories(categories.concat([event.target.value]));
        } else {
            setCategories(categories.filter(element => element !== event.target.value));
        }
    };

    const handleQueryChange = event => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/products/?manufacturer=${manufacturers.toString()}&categories=${categories.toString()}&search=${query}`
        ).then(
            response => response.json()
        ).then(
            data => setResults(data)
        );
    }, [categories, manufacturers, query])

    const handleAddToCart = event => {
        props.addToCart(event);
    };

    const handleRemoveFromCart = event => {
        props.removeFromCart(event);
    };

    return (
        <div>
            <Sidebar manufacturerChange={handleManufacturerChange} categoriesChange={handleCategoriesChange} queryChange={handleQueryChange} />
            <Results results={results} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} cartItems={props.items} />
            <Cart items={props.items} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
        </div>
    );
}
