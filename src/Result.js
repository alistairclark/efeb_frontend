import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Result extends PureComponent {
    static propTypes = {
        object: PropTypes.object,
        display_name: PropTypes.string,
        manufacturer: PropTypes.string,
        price: PropTypes.string,
        picture: PropTypes.string,
        stock_count: PropTypes.number,
        description: PropTypes.string,
        links: PropTypes.string,
        slug: PropTypes.string,
        addToCart: PropTypes.func,
        removeFromCart: PropTypes.func,
        canAdd: PropTypes.bool
    };


    handleAddToCart = event => {
        this.props.addToCart(event);
    };

    handleRemoveFromCart = event => {
        this.props.removeFromCart(event);
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
                {this.props.canAdd &&
                    <button onClick={this.handleAddToCart} value={JSON.stringify(this.props.object)}>Add to cart</button>
                }
                {this.props.canRemove &&
                    <button onClick={this.handleRemoveFromCart} value={JSON.stringify(this.props.object)}>Remove from cart</button>
                }
            </div >
        );
    }
}
