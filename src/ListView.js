import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Results from "./Results";
import Cart from "./Cart";
import PropTypes from "prop-types";

export default class ListView extends Component {

    state = {
        results: [],
        categories: [],
        manufacturers: [],
        query: ""
    }

    static propTypes = {
        items: PropTypes.object,
        addToCart: PropTypes.func,
        removeFromCart: PropTypes.func,
    };

    fetchResults() {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/products/?manufacturer=${this.state.manufacturers.toString()}&categories=${this.state.categories.toString()}&search=${this.state.query}`
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
                manufacturers: prevState.manufacturers.filter(element => element !== event.target.value)
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
                categories: prevState.categories.filter(element => element !== event.target.value)
            }));
        }
    };

    handleQueryChange = event => {
        this.setState(prevState => ({ query: event.target.value }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
            this.fetchResults();
        }
    }

    componentDidMount() {
        this.fetchResults();
    }

    handleAddToCart = event => {
        this.props.addToCart(event);
    };

    handleRemoveFromCart = event => {
        this.props.removeFromCart(event);
    };

    render() {
        return (
            <div>
                <Sidebar manufacturerChange={this.handleManufacturerChange} categoriesChange={this.handleCategoriesChange} queryChange={this.handleQueryChange} />
                <Results results={this.state.results} addToCart={this.handleAddToCart} removeFromCart={this.handleRemoveFromCart} cartItems={this.props.items} />
                <Cart items={this.props.items} addToCart={this.handleAddToCart} removeFromCart={this.handleRemoveFromCart} />
            </div>
        );
    }
}
