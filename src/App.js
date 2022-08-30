import React, { Component } from "react";
import "./App.css";
import MainHeader from "./components/header";
import ItemsList from "./components/itemslist";
import BigCart from "./components/bigcart";
import CartList from "./components/cartlist";
import ItemInfo from "./components/iteminfo";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory:
        window.location.pathname.replace("/", "").length > 0
          ? window.location.pathname.replace("/", "")
          : "",
      mainCategories: [],
      itemsOfCategories: {},
      currentCurrency: "",
      allCurrencies: [],
      cartCurrentItems: [],
      cartCurrentInfo: {},
      showCurrenciesList: false,
      showCartList: false,
    };
    this.categoryOnChangeHandler = this.categoryOnChangeHandler.bind(this);
    this.currencyOnChangeHandler = this.currencyOnChangeHandler.bind(this);
    this.cartItemOnChangeHandler = this.cartItemOnChangeHandler.bind(this);
    this.toggleCurrenciesList = this.toggleCurrenciesList.bind(this);
    this.turnCartListOn = this.turnCartListOn.bind(this);
    this.setCurrentCategory = this.setCurrentCategory.bind(this);
    this.hideCartList = this.hideCartList.bind(this);
    this.addItemWithNewAttToCart = this.addItemWithNewAttToCart.bind(this);
  }

  componentDidMount() {
    client
      .query({
        query: gql`
          query getCategories {
            categories {
              name
              products {
                id
                inStock
                description
                brand
                name
                gallery
                category
                attributes {
                  id
                  name
                  type
                  items {
                    id
                    value
                    displayValue
                  }
                }
                prices {
                  amount
                  currency {
                    label
                    symbol
                  }
                }
              }
            }
          }
        `,
      })
      .then((results) => {
        // set categories start
        let itemsOfCategories = {};
        results.data.categories.forEach((one) => {
          itemsOfCategories[one.name] = one.products;
        });
        let mainCategories = results.data.categories.map((one) => one.name);
        // set categories end
        // set currencies start
        let allCurrencies = [],
          currentCurrency;
        results.data.categories[0].products[0].prices.forEach((price) => {
          allCurrencies.push([
            price.currency.label.toUpperCase(),
            price.currency.symbol,
          ]);
        });
        currentCurrency = `${
          allCurrencies[0][1]
        } ${allCurrencies[0][0].toLowerCase()}`;
        // should be like that [["$","USD"]]
        //set currencies end
        // set cart current info start
        let cartCurrentInfo = {
          taxes: 0.21,
          totalNoTaxes: () => {
            return this.state.cartCurrentItems.reduce((a, one) => {
              let priceWithoutTaxes = one.prices.filter(
                (price) =>
                  price.currency.symbol ===
                  this.state.currentCurrency.split(" ")[0]
              )[0].amount;
              return a + priceWithoutTaxes * one.numberOfPieces;
            }, 0);
          },
          quantity: () => {
            return this.state.cartCurrentItems.reduce((a, one) => {
              return a + one.numberOfPieces;
            }, 0);
          },
        };
        // set cart current info end
        this.setState({
          ...this.state,
          mainCategories,
          currentCategory:
            window.location.pathname.replace("/", "").length > 0
              ? window.location.pathname.replace("/", "")
              : mainCategories[0],
          itemsOfCategories,
          allCurrencies,
          currentCurrency,
          cartCurrentInfo,
        });
      });
  }

  addItemWithNewAttToCart(theItem) {
    let cartCurrentItems = [...this.state.cartCurrentItems];
    cartCurrentItems.forEach((one, index) => {
      if (one.id === theItem.id) {
        delete cartCurrentItems[index];
        cartCurrentItems = cartCurrentItems.filter((n) => n);
      }
    });
    cartCurrentItems.push(theItem);
    this.setState({ ...this.state, cartCurrentItems });
  }

  setAllCurrencies() {
    console.log(this.state.cartCurrentItems);
    let allCurrencies = this.state.itemsOfCategories[
      this.state.currentCategory
    ][0].prices.map((price) => {
      return [price.currency.label, price.currency.symbol];
    });
    console.log(JSON.stringify(allCurrencies));
  }

  categoryOnChangeHandler(nameOfClickedElement) {
    this.setState({ ...this.state, currentCategory: nameOfClickedElement });
  }
  currencyOnChangeHandler(chosedCurrency) {
    this.setState({ ...this.state, currentCurrency: chosedCurrency });
  }
  cartItemOnChangeHandler(itemId, key, newValue) {
    let newCart = this.state.cartCurrentItems.map((cartItem) => {
      if (cartItem.id === itemId) {
        cartItem[key] = newValue;
      }
      return cartItem;
    });
    this.setState({ ...this.state, cartCurrentItems: newCart });
  }
  toggleCurrenciesList() {
    this.setState({
      ...this.state,
      showCurrenciesList: !this.state.showCurrenciesList,
    });
  }
  turnCartListOn() {
    this.setState({
      ...this.state,
      showCartList: true,
    });
  }

  hideListsIfShown() {
    if (this.state.showCurrenciesList) {
      this.setState({
        ...this.state,
        showCurrenciesList: false,
      });
    }
  }
  hideCartList() {
    if (this.state.showCartList) {
      this.setState({
        ...this.state,
        showCartList: false,
      });
    }
  }
  setCurrentCategory(newValue) {
    this.setState({
      ...this.state,
      currentCategory: newValue,
    });
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div
            className="App"
            style={{ maxWidth: "1900px", margin: "auto" }}
            onClick={() => this.hideListsIfShown()}
          >
            <MainHeader
              // Category
              currentCategory={this.state.currentCategory}
              categoryOnChangeHandler={this.categoryOnChangeHandler}
              mainCategories={this.state.mainCategories}
              setCurrentCategory={this.setCurrentCategory}
              // Currency
              allCurrencies={this.state.allCurrencies}
              currentCurrency={this.state.currentCurrency}
              currencyOnChangeHandler={this.currencyOnChangeHandler}
              // Cart
              cartCurrentItems={this.state.cartCurrentItems}
              cartItemOnChangeHandler={this.cartItemOnChangeHandler}
              // Currencies List
              toggleCurrenciesList={this.toggleCurrenciesList}
              showCurrenciesList={this.state.showCurrenciesList}
              // Cart List
              showCartList={this.state.showCartList}
              turnCartListOn={this.turnCartListOn}
              hideCartList={this.hideCartList}
            />
            <CartList
              cartCurrentItems={this.state.cartCurrentItems}
              cartItemOnChangeHandler={this.cartItemOnChangeHandler}
              showCartList={this.state.showCartList}
              turnCartListOn={this.state.turnCartListOn}
              currentCurrency={this.state.currentCurrency}
              hideCartList={this.hideCartList}
              cartCurrentInfo={this.state.cartCurrentInfo}
            />
            <Routes>
              <Route
                path="/"
                element={<Navigate to={"/" + this.state.currentCategory} />}
              />
              <Route
                path="/:categoryname"
                element={
                  <ItemsList
                    currentCategory={this.state.currentCategory}
                    currentCategoryItemsArr={
                      this.state.itemsOfCategories[this.state.currentCategory]
                    }
                    currentCurrency={this.state.currentCurrency}
                  />
                }
              />
              <Route
                path="/bigcart"
                element={
                  <BigCart
                    cartCurrentItems={this.state.cartCurrentItems}
                    cartItemOnChangeHandler={this.cartItemOnChangeHandler}
                    currentCurrency={this.state.currentCurrency}
                    cartCurrentInfo={this.state.cartCurrentInfo}
                  />
                }
              />
              <Route
                path="/iteminfo/:itemid"
                element={
                  <ItemInfo
                    currentCurrency={this.state.currentCurrency}
                    itemsOfCategories={this.state.itemsOfCategories}
                    addItemWithNewAttToCart={this.addItemWithNewAttToCart}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
