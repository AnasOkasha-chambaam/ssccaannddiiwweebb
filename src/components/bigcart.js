import React, { Component } from "react";
import CartItems from "./cartitems";

export default class bigCart extends Component {
  render() {
    if (Object.keys(this.props.cartCurrentInfo).length > 0)
      return (
        <div
          style={{
            display: "block",
            padding:
              "calc(80px*var(--factor)) calc(101px*var(--factor)) calc(191px*var(--factor)) calc(101px*var(--factor))",
          }}
          className="the-big-cart"
        >
          <h1 style={{ marginBottom: "59px" }}>CART</h1>
          <CartItems
            bigCart={true}
            cartCurrentItems={this.props.cartCurrentItems}
            cartItemOnChangeHandler={this.props.cartItemOnChangeHandler}
            currentCurrency={this.props.currentCurrency}
            className="item-of-big-cart"
            totalNoTaxes={this.props.cartCurrentInfo.totalNoTaxes()}
            taxes={this.props.cartCurrentInfo.taxes}
            quantity={this.props.cartCurrentInfo.quantity()}
          />
        </div>
      );
    return (
      <h1 style={{ margin: "auto", textAlign: "center" }}>No thing to show</h1>
    );
  }
}
