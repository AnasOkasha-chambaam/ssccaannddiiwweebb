import React, { Component } from "react";
import ItemInfoAttribute from "./item_info/iteminfoattribute";
export class rightinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      componentKey:
        "_" +
        this.props.item.id +
        (Math.random() * 2000).toFixed(0) +
        (this.props.bigCart && this.props.bigCart === true ? "_big_cart" : ""),
    };
  }
  render() {
    let currentCurrencySymbol = this.props.currentCurrency.split(" ")[0];
    return (
      <div style={{ width: "292px", maxWidth: "292px" }}>
        {/* brand name */}
        <h2>{this.props.item.brand}</h2>
        {/* item name */}
        <p>{this.props.item.name}</p>
        {/* attributes */}
        {this.props.item.attributes.map((att, ind) => {
          return (
            <ItemInfoAttribute
              key={att.name + "_" + ind}
              attribute={att}
              theKey={att.name + "__" + ind}
            />
          );
        })}
        <p
          style={{
            fontWeight: "600",
            padding: "4px 0",
            marginTop: "36px",
          }}
        >
          <span
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: "18px",
            }}
          >
            PRICE:
          </span>
          <br />
          {currentCurrencySymbol}{" "}
          {this.props.categoryItem.prices
            .filter((one) => {
              return one.currency.symbol === currentCurrencySymbol;
            })
            .map((one) => {
              return one.amount;
            })}
        </p>
        <button className="add-remove-btn">ADD TO CART</button>
        <p
          style={{ marginTop: "40px", fontSize: "16px" }}
          dangerouslySetInnerHTML={{
            __html: this.props.categoryItem.description,
          }}
        ></p>
      </div>
    );
  }
}

export default rightinfo;
