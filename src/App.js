import React, { PureComponent } from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Results from "./Results";
import Cart from "./Cart";

export default class App extends PureComponent {

  state = {
    results: [],
    categories: [],
    manufacturers: [],
    query: "",
    cartItems: []
  }

  fetchResults() {
    fetch(
      `https://efeb-backend.herokuapp.com/api/products/?manufacturer=${this.state.manufacturers.toString()}&categories=${this.state.categories.toString()}&search=${this.state.query}`
    ).then(
      response => response.json()
    ).then(
      data => this.setState({ results: data }));
  }

  handleManufacturerChange = event => {
    if (event.target.checked) {
      this.setState(prevState => ({
        manufacturers: prevState.manufacturers.concat([event.target.value])
      }));
    } else {
      this.setState(prevState => ({
        manufacturers: prevState.manufacturers.filter(element => element != event.target.value)
      }));
    }
  };

  handleCategoriesChange = event => {
    if (event.target.checked) {
      this.setState(prevState => ({
        categories: prevState.categories.concat([event.target.value])
      }));
    } else {
      this.setState(prevState => ({
        categories: prevState.categories.filter(element => element != event.target.value)
      }));
    }
  };

  handleQueryChange = event => {
    this.setState(prevState => ({ query: event.target.value }));
  }

  handleAddToCart = event => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.concat([event.target.value])
    }));
  }

  handleRemoveFromCart = event => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.filter(element => element != element)
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      this.fetchResults();
    }
  }

  componentDidMount() {
    this.fetchResults();
  }

  render() {
    return (
      <div>
        <Sidebar manufacturerChange={this.handleManufacturerChange} categoriesChange={this.handleCategoriesChange} queryChange={this.handleQueryChange} />
        <Results results={this.state.results} addToCart={this.handleAddToCart} removeFromCart={this.handleRemoveFromCart} />
        <Cart items={this.state.cartItems} />
      </div>
    );
  }
}
