import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class singleitem extends Component {
  render() {
    let currentCurrencySymbol = this.props.currentCurrency.split(" ")[0];
    return (
      <Link to={"/iteminfo/" + this.props.categoryItem.id}>
        <li
          className="item-cart"
          style={{
            // backgroundColor: "green",
            width: "100%",
            height: "470px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transitionProperty: "box-shadow",
            transitionDuration: "0.3s",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <img
            src={this.props.categoryItem.gallery[0]}
            alt="poqoguweh pwoih"
            width="100%"
            height="85%"
            style={{ display: "block", objectFit: "contain" }}
          />
          <div>
            <p style={{ padding: "4px 0" }}>{this.props.categoryItem.name}</p>
            <p style={{ fontWeight: "600", padding: "4px 0" }}>
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
