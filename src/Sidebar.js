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
        <div className="component-result-row">
            <input type="text" name="search" onKeyUp={handleQueryChange} />
            {categories.map(category => (
                <div key={category.slug}>
                    <label htmlFor={category.slug}>{category.display_name}</label>
                    <input name={category.slug} onChange={handleCategoriesChange} type="checkbox" value={category.slug} />
                </div>
            ))}
            {manufacturers.map(manufacturer => (
                <div key={manufacturer.slug}>
                    <label htmlFor={manufacturer.slug}>{manufacturer.display_name}</label>
                    <input name={manufacturer.slug} onChange={handleManufacturerChange} type="checkbox" value={manufacturer.slug} />
                </div>
            ))}
        </div >
    );
}
