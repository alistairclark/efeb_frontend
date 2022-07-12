import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Results from "./Results";
import Cart from "./Cart";

export default class ListView extends Component {

    state = {
        results: [],
        categories: [],
        manufacturers: [],
        query: "",
        cartItems: {}
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

        if (item.quantity == 1) {
            delete cartItems[data.slug];
        } else {
            cartItems[data.slug].quantity -= 1;
        }

        this.setState(prevState => ({
            cartItems: cartItems
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
                <Results results={this.state.results} addToCart={this.handleAddToCart} removeFromCart={this.handleRemoveFromCart} cartItems={this.state.cartItems} />
                <Cart items={this.state.cartItems} addToCart={this.handleAddToCart} removeFromCart={this.handleRemoveFromCart} />
            </div>
        );
    }
}
