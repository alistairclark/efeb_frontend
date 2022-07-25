import React from "react";

export default function Cart (props) {

    const handleAddToCart = event => {
        props.addToCart(event);
    };

    const handleRemoveFromCart = event => {
        props.removeFromCart(event);
    };

    const calculateTotal = () => {
        let total = 0

        Object.entries(props.items).forEach(function ([_, item]) {
            total += parseFloat(item.data.price) * item.quantity;
        })

        return total;
    }

    const canAdd = (item) => {
        if (item.slug in props.items) {
            return props.items[item.slug].quantity < item.stock_count
        } else if (item.stock_count === 0) {
            return false;
        }

        return true;
    }

    const canRemove = (item) => {
        return item.slug in props.items;
    }

    return (
        <div>
        {Object.keys(props.items).length !== 0 && 
        <div className="cart">
            {Object.values(props.items).map((value) => {
                return (
                    <div className="cart-item" key={value.data.slug}>
                        <div className="cart-item-details">{value.data.display_name} (x{value.quantity})</div>
                        <div className="cart-item-pricing">
                            <span className="price">
                                £{value.data.price * value.quantity}
                            </span>
                            <span className="add-button">
                                {canAdd(value.data) &&
                                    <button className="addRemove" onClick={handleAddToCart} value={JSON.stringify(value.data)}>+</button>
                                }
                            </span>
                            <span className="remove-button">
                                {canRemove(value.data) &&
                                    <button className="addRemove" onClick={handleRemoveFromCart} value={JSON.stringify(value.data)}>-</button>
                                }
                            </span>
                        </div>
                    </div>
                )
            })}
            <div className="cart-total">Total: <span className="cart-total-price">£{calculateTotal()}</span></div>

            <form method="post" action={`${process.env.REACT_APP_BACKEND_URL}/checkout/`}>
                <input type="hidden" name="cart" value={JSON.stringify(props.items)} />
                <input className="checkout" type="submit" value="Checkout" />
            </form>
        </div >
        }
        </div>
    );
}
