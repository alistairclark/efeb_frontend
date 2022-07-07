import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Result extends PureComponent {
    static propTypes = {
        display_name: PropTypes.string,
        manufacturer: PropTypes.string,
        price: PropTypes.string,
        picture: PropTypes.string,
        stock_count: PropTypes.number,
        description: PropTypes.string,
        links: PropTypes.string,
        slug: PropTypes.string,
    };

    render() {
        return (
            <div className="component-result-row">
                <div>{this.props.display_name}</div>
                <div>Manufacturer: {this.props.manufacturer}</div>
                {this.props.categories.map(category => (
                    <div key={category.slug}>{category.display_name}</div>
                ))}
                <div>{this.props.price}</div>
                <img height="200" src={this.props.picture} />
                <div>{this.props.stock_count} in stock</div>
                <div>{this.props.description}</div>
                <div>{this.props.links}</div>
                <div>{this.props.slug}</div>
            </div >
        );
    }
}
