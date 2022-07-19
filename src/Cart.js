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
        <div className="cart">
            <h2>Cart</h2>
            {Object.values(props.items).map((value) => {
                return (
                    <div key={value.data.slug}>{value.data.display_name} £{value.data.price * value.quantity}
                        {canAdd(value.data) &&
                            <button onClick={handleAddToCart} value={JSON.stringify(value.data)}>Add to cart</button>
                        }
                        {canRemove(value.data) &&
                            <button onClick={handleRemoveFromCart} value={JSON.stringify(value.data)}>Remove from cart</button>
                        }
                    </div>
                )
            })}
            Total: £{calculateTotal()}

            <form method="post" action={`${process.env.REACT_APP_BACKEND_URL}/checkout/`}>
                <input type="hidden" name="cart" value={JSON.stringify(props.items)} />
                <input type="submit" value="Checkout" />
            </form>
        </div >
    );
}
