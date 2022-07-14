import React, { PureComponent } from "react";
import CancelledView from "./CancelledView";
import ListView from "./ListView";
import DetailView from "./DetailView";
import SuccessView from "./SuccessView";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends PureComponent {
  state = {
    cartItems: {}
  }

  handleAddToCart = event => {
    let data = JSON.parse(event.target.value)
    let cartItems = { ...this.state.cartItems, }

    if (data.slug in cartItems) {
        let item = cartItems[data.slug];
        item.quantity += 1;

        cartItems[data.slug] = item;
    } else {
        cartItems[data.slug] = {
            data: data,
            quantity: 1,
        }
    }

    this.setState(_ => ({
        cartItems: cartItems
    }));
  }

  handleRemoveFromCart = event => {
      let data = JSON.parse(event.target.value)
      let cartItems = { ...this.state.cartItems, }

      let item = cartItems[data.slug]

      if (item.quantity === 1) {
          delete cartItems[data.slug];
      } else {
          cartItems[data.slug].quantity -= 1;
      }

      this.setState(prevState => ({
          cartItems: cartItems
      }));
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListView addToCart={this.handleAddToCart} removeFromCart={this.handleRemoveFromCart} items={this.state.cartItems}/>} />
            <Route path="/success/" element={<SuccessView />} />
            <Route path="/cancelled/" element={<CancelledView />} />
            <Route path="/products/:slug" element={<DetailView addToCart={this.handleAddToCart} removeFromCart={this.handleRemoveFromCart} items={this.state.cartItems}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
