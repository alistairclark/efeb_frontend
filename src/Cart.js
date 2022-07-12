import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Cart extends PureComponent {
    static propTypes = {
        items: PropTypes.object,
        addToCart: PropTypes.func,
        removeFromCart: PropTypes.func,
    };

    handleAddToCart = event => {
        this.props.addToCart(event);
    };

    handleRemoveFromCart = event => {
        this.props.removeFromCart(event);
    };

    calculateTotal() {
        let total = 0

        Object.entries(this.props.items).forEach(function ([_, item]) {
            total += parseFloat(item.data.price) * item.quantity;
        })

        return total;
    }

    canAdd(item) {
        if (item.slug in this.props.items) {
            return this.props.items[item.slug].quantity < item.stock_count
        } else if (item.stock_count == 0) {
            return false;
        }

        return true;
    }

    canRemove(item) {
        return item.slug in this.props.items;
    }

    render() {
        return (
            <div className="cart">
                {Object.values(this.props.items).map((value) => {
                    return (
                        <div key={value.data.slug}>{value.data.display_name} £{value.data.price * value.quantity}
                            {this.canAdd(value.data) &&
                                <button onClick={this.handleAddToCart} value={JSON.stringify(value.data)}>Add to cart</button>
                            }
                            {this.canRemove(value.data) &&
                                <button onClick={this.handleRemoveFromCart} value={JSON.stringify(value.data)}>Remove from cart</button>
                            }
                        </div>
                    )
                })}
                Total: £{this.calculateTotal()}

                <form method="post" action="http://127.0.0.1:8000/checkout/">
                    <input type="hidden" name="cart" value={JSON.stringify(this.props.items)} />
                    <input type="submit" value="Checkout" />
                </form>
            </div >
        );
    }
}
