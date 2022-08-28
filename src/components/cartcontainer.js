import React, { Component } from "react";
import CartIcon from "./carticon";

export default class cartContainer extends Component {
  render() {
    return (
      <div
        className="cart-container with-hidden-list"
        onClick={() => this.props.turnCartListOn()}
        style={{ position: "relative" }}
      >
        <CartIcon numberOfItems={this.props.cartCurrentItems.length} />
      </div>
    );
  }
}
