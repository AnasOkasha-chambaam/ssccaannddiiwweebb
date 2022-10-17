import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddToCartIcon from "./addtocarticon";

export default class SingleItem extends Component {
  render() {
    let currentCurrencySymbol = this.props.currentCurrency.split(" ")[0];
    return (
      <Link to={"/iteminfo/" + this.props.categoryItem.id}>
        <li
          className="item-cart"
          style={{
            // backgroundColor: "green",
            minWidth: "333px",
            height: "470px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transitionProperty: "box-shadow",
            transitionDuration: "0.3s",
            transitionTimingFunction: "ease-in-out",
            position: "relative",
          }}
        >
          <div
            className={
              "hide add-to-cart-icon" +
              (this.props.categoryItem.inStock ? " out-of-stock" : "")
            }
            onClick={(e) => {
              e.preventDefault();
              console.log("Toggle");
              if (!this.props.categoryItem.inStock) return;
              console.log(this.props.onCart);
              if (!this.props.onCart) {
                let selectedAtt = [],
                  attNames = Object.keys(this.state.currentValsObj).sort();
                attNames.forEach((name) => {
                  selectedAtt.push(this.state.currentValsObj[name]);
                });
                // this.props.addSelectedAttToItemInfo(JSON.stringify(selectedAtt));
                this.props.addSelectedAttToItemInfo(this.state.currentValsObj);
                return;
              }
              this.props.deleteTheItem(this.props.item.id);
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
