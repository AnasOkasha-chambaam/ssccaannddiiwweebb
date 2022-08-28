import React, { Component } from "react";
import Categories from "./categories";
import Logo from "./logo";
import CurrencyAndCart from "./currencyandcart";
export default class Header extends Component {
  render() {
    let headerStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignContent: "flex-start",
      alignItems: "flex-start",
      padding: "24px 101px 0 101px",
      position: "relative",
      backgroundColor: "white",
      zIndex: "9",
    };
    return (
      <header
        className="main-header"
        style={headerStyle}
        onClick={() => this.props.hideCartList()}
      >
        <Categories
          currentCategory={this.props.currentCategory}
          categoryOnChangeHandler={this.props.categoryOnChangeHandler}
          mainCategories={this.props.mainCategories}
          setCurrentCategory={this.props.setCurrentCategory}
        />
        <Logo />
        <CurrencyAndCart
          allCurrencies={this.props.allCurrencies}
          currentCurrency={this.props.currentCurrency}
          currencyOnChangeHandler={this.props.currencyOnChangeHandler}
          cartCurrentItems={this.props.cartCurrentItems}
          cartItemOnChangeHandler={this.props.cartItemOnChangeHandler}
          toggleCurrenciesList={this.props.toggleCurrenciesList}
          showCurrenciesList={this.props.showCurrenciesList}
          showCartList={this.props.showCartList}
          turnCartListOn={this.props.turnCartListOn}
        />
      </header>
    );
  }
}
