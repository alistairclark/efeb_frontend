import React, { useState } from "react";
import CancelledView from "./CancelledView";
import ListView from "./ListView";
import DetailView from "./DetailView";
import SuccessView from "./SuccessView";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App(props) {
  const [cartItems, setCartItems] = useState({});

  const handleAddToCart = event => {
    let data = JSON.parse(event.target.value)
    let items = { ...cartItems, }

    if (data.slug in items) {
        let item = items[data.slug];
        item.quantity += 1;

        items[data.slug] = item;
    } else {
        items[data.slug] = {
            data: data,
            quantity: 1,
        }
    }

    setCartItems(items);
  }

  const handleRemoveFromCart = event => {
      let data = JSON.parse(event.target.value)
      let items = { ...cartItems, }

      let item = items[data.slug]

      if (item.quantity === 1) {
          delete items[data.slug];
      } else {
        items[data.slug].quantity -= 1;
      }

      setCartItems(items);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListView addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} items={cartItems}/>} />
          <Route path="/success/" element={<SuccessView />} />
          <Route path="/cancelled/" element={<CancelledView />} />
          <Route path="/products/:slug" element={<DetailView addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} items={cartItems}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
