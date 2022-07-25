import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Results from "./Results";
import Cart from "./Cart";
import { useQueryParam, ArrayParam, StringParam } from 'use-query-params';

import "./ListView.scss";

export default function ListView (props) {
    const [categories, setCategoriesQuery] = useQueryParam("categories", ArrayParam);
    const [manufacturers, setManufacturersQuery] = useQueryParam("manufacturers", ArrayParam);
    const [search, setSearchQuery] = useQueryParam("search", StringParam);

    const [results, setResults] = useState([]);
    const [selected_categories, setCategories] = useState(categories || []);
    const [selected_manufacturers, setManufacturers] = useState(manufacturers || []);
    const [selected_query, setQuery] = useState(search || "");

    const handleManufacturerChange = event => {
        if (event.target.checked) {
            setManufacturers(selected_manufacturers.concat([event.target.value]));
        } else {
            setManufacturers(selected_manufacturers.filter(element => element !== event.target.value));
        }
    };

    const handleCategoriesChange = event => {
        if (event.target.checked) {
            setCategories(selected_categories.concat([event.target.value]));
        } else {
            setCategories(selected_categories.filter(element => element !== event.target.value));
        }
    };

    const handleQueryChange = event => {
        setQuery(event.target.value);
    }

    useEffect(() => {
        if (selected_manufacturers.length > 0) {
            setManufacturersQuery(selected_manufacturers.toString());
        } else {
            setManufacturersQuery(undefined);
        }

        if (selected_categories.length > 0) {
            setCategoriesQuery(selected_categories.toString());
        } else {
            setCategoriesQuery(undefined);
        }

        if (selected_query) {
            setSearchQuery(selected_query);
        } else {
            setSearchQuery(undefined);
        }

        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/products/?manufacturer=${selected_manufacturers.toString()}&categories=${selected_categories.toString()}&search=${selected_query}`
        ).then(
            response => response.json()
        ).then(
            data => setResults(data)
        );
    }, [
        setSearchQuery,
        setCategoriesQuery,
        setManufacturersQuery,
        selected_categories,
        selected_manufacturers,
        selected_query
    ]
    )

    const handleAddToCart = event => {
        props.addToCart(event);
    };

    const handleRemoveFromCart = event => {
        props.removeFromCart(event);
    };

    return (
        <div className="wrapper">
            <Sidebar manufacturerChange={handleManufacturerChange} categoriesChange={handleCategoriesChange} queryChange={handleQueryChange} selected_categories={selected_categories} selected_manufacturers={selected_manufacturers} />
            <Results results={results} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} cartItems={props.items} />
            <Cart items={props.items} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
        </div>
    );
}
