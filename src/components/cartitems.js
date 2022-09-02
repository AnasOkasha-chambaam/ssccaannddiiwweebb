import React, { Component } from "react";
import CartItem from "./cartitem";
import CheckOutInfo from "./checkoutinfo";
export default class cartItems extends Component {
  render() {
    return (
      <ul>
        {this.props.cartCurrentItems.map((item) => {
          return (
            <CartItem
              bigCart={this.props.bigCart ? this.props.bigCart : false}
              key={item.id}
              item={item}
              cartItemOnChangeHandler={this.props.cartItemOnChangeHandler}
              currentCurrency={this.props.currentCurrency}
              className={this.props.className}
              deleteTheItem={this.props.deleteTheItem}
            />
          );
        })}
        {this.props.bigCart ? (
          <CheckOutInfo
            className={this.props.className ? this.props.className : ""}
            totalNoTaxes={this.props.totalNoTaxes}
            taxes={this.props.taxes}
            quantity={this.props.quantity}
          />
        ) : (
          ""
        )}
      </ul>
    );
  }
}
