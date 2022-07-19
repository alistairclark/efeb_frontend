import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Sidebar (props) {

    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufcaturers] = useState([]);

    const handleManufacturerChange = event => {
        props.manufacturerChange(event);
    };

    const handleCategoriesChange = event => {
        props.categoriesChange(event);
    };

    const handleQueryChange = event => {
        props.queryChange(event);
    }

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/categories/`, {}
        ).then(
            response => response.json()
        ).then(
            data => setCategories(data)
        );

        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/manufacturers/`, {}
        ).then(
            response => response.json()
        ).then(
            data => setManufcaturers(data)
        );
    }, [params]);

    return (
        <div className="component-sidebar">
            <h1>EFEB</h1>
            <h2>Search</h2>
            <input type="text" name="search" onKeyUp={handleQueryChange} />
            <h2>Categories</h2>
            {categories.map(category => (
                <div key={category.slug}>
                    <label htmlFor={category.slug}>{category.display_name}</label>
                    <input checked={props.selected_categories.includes(category.slug)} name={category.slug} onChange={handleCategoriesChange} type="checkbox" value={category.slug} />
                </div>
            ))}
            <h2>Manufacturers</h2>
            {manufacturers.map(manufacturer => (
                <div key={manufacturer.slug}>
                    <label htmlFor={manufacturer.slug}>{manufacturer.display_name}</label>
                    <input checked={props.selected_manufacturers.includes(manufacturer.slug)} name={manufacturer.slug} onChange={handleManufacturerChange} type="checkbox" value={manufacturer.slug} />
                </div>
            ))}
        </div >
    );
}
