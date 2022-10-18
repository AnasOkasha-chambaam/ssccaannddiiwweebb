import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddToCartIcon from "./addtocarticon";

export default class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.setItemValues = this.setItemValues.bind(this);
  }
  /**
   * Set the attribuites of the object to the first choice of each one.
   * It happens before adding the item to cart
   */
  setItemValues() {
    let selectedAttributes = {};
    this.props.categoryItem.attributes.forEach((attribute) => {
      selectedAttributes[attribute.name] = attribute.items[0].value;
    });
    // this.setState({ ...this.state, currentValsObj: selectedAttributes });
    return selectedAttributes;
  }
  render() {
    let currentCurrencySymbol = this.props.currentCurrency.split(" ")[0];
    return (
      <Link to={"/iteminfo/" + this.props.categoryItem.id}>
        <li
          className="item-cart single-item"
          // style={{
          //   // backgroundColor: "green",
          //   minWidth: "333px",
          //   height: "470px",
          //   padding: "16px",
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: "space-between",
          //   transitionProperty: "box-shadow",
          //   transitionDuration: "0.3s",
          //   transitionTimingFunction: "ease-in-out",
          //   position: "relative",
          // }}
        >
          <div
            className={
              "hide add-to-cart-icon" +
              (this.props.categoryItem.inStock ? " out-of-stock" : "")
            }
            onClick={(e) => {
              e.preventDefault();
              if (!this.props.categoryItem.inStock) return;
              // console.log(this.props.onCart);
              if (!this.props.onCart) {
                /**
                 * Set the attribuites of the object to the first choice of each one.
                 * It happens before adding the item to cart
                 */
                let currentValsObj = this.setItemValues();
                console.log(currentValsObj);
                let selectedAtt = [],
                  attNames = Object.keys(currentValsObj).sort();
                attNames.forEach((name) => {
                  selectedAtt.push(currentValsObj[name]);
                });
                console.log(selectedAtt);
                // this.props.addSelectedAttToItemInfo(JSON.stringify(selectedAtt));
                // this.props.addSelectedAttToItemInfo(this.state.currentValsObj);
                return;
              }
              this.props.deleteTheItem(this.props.item.id);
              console.log("Toggle");
            }}
          >
            <AddToCartIcon cartItemsNumber={false} />
          </div>
          <div
            className={
              "hide" + (!this.props.categoryItem.inStock ? " out-of-stock" : "")
            }
          >
            OUT OF STOCK
          </div>
          <img
            src={this.props.categoryItem.gallery[0]}
            alt="poqoguweh pwoih"
            width="100%"
            height="85%"
            style={{ display: "block", objectFit: "contain" }}
          />
          <div>
            <p
              style={{
                padding: "4px 0",
                color: !this.props.categoryItem.inStock ? "#8D8F9A" : "auto",
              }}
            >
              {this.props.categoryItem.name}
            </p>
            <p
              style={{
                fontWeight: "600",
                padding: "4px 0",
                color: !this.props.categoryItem.inStock ? "#8D8F9A" : "auto",
              }}
            >
              {currentCurrencySymbol}{" "}
              {this.props.categoryItem.prices
                .filter((one) => {
                  return one.currency.symbol === currentCurrencySymbol;
                })
                .map((one) => {
                  return one.amount;
                })}
            </p>
          </div>
        </li>
      </Link>
    );
  }
}
