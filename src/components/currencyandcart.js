import React, { Component } from "react";
import CurrencyContainer from "./currencycontainer";
import CartContainer from "./cartcontainer";

export default class currencyandcurrent extends Component {
  render() {
    return (
      <div style={{ display: "flex", gap: "22px" }}>
        <CurrencyContainer
          allCurrencies={this.props.allCurrencies}
          currentCurrency={this.props.currentCurrency}
          currencyOnChangeHandler={this.props.currencyOnChangeHandler}
          toggleCurrenciesList={this.props.toggleCurrenciesList}
          showCurrenciesList={this.props.showCurrenciesList}
        />
        <CartContainer
          cartCurrentItems={this.props.cartCurrentItems}
          cartItemOnChangeHandler={this.props.cartItemOnChangeHandler}
          showCartList={this.props.showCartList}
          turnCartListOn={this.props.turnCartListOn}
          currentCurrency={this.props.currentCurrency}
        />
      </div>
    );
  }
}
