import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Sidebar extends PureComponent {
    static propTypes = {
        manufacturerChange: PropTypes.func,
        categoriesChange: PropTypes.func,
        queryChange: PropTypes.func
    };

    state = {
        categories: [],
        manufacturers: []
    }

    handleManufacturerChange = event => {
        this.props.manufacturerChange(event);
    };

    handleCategoriesChange = event => {
        this.props.categoriesChange(event);
    };

    handleQueryChange = event => {
        this.props.queryChange(event);
    }

    componentDidMount() {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/categories/`, {}
        ).then(
            response => response.json()
        ).then(
            data => this.setState({ categories: data })
        );

        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/manufacturers/`, {}
        ).then(
            response => response.json()
        ).then(
            data => this.setState({ manufacturers: data })
        );
    }

    render() {
        return (
            <div className="component-result-row">
                <input type="text" name="search" onKeyUp={this.handleQueryChange} />
                {this.state.categories.map(category => (
                    <div key={category.slug}>
                        <label htmlFor={category.slug}>{category.display_name}</label>
                        <input name={category.slug} onChange={this.handleCategoriesChange} type="checkbox" value={category.slug} />
                    </div>
                ))}
                {this.state.manufacturers.map(manufacturer => (
                    <div key={manufacturer.slug}>
                        <label htmlFor={manufacturer.slug}>{manufacturer.display_name}</label>
                        <input name={manufacturer.slug} onChange={this.handleManufacturerChange} type="checkbox" value={manufacturer.slug} />
                    </div>
                ))}
            </div >
        );
    }
}
