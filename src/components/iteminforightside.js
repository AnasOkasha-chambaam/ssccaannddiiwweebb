import React, { Component } from "react";
import ItemInfoAttribute from "./item_info/iteminfoattribute";
export class rightinfo extends Component {
  constructor(props) {
    super(props);
    // id
    this.state = {
      componentKey: this.props.item.id,
      currentValsObj: {},
    };
    this.currentSelectedAtt = this.currentSelectedAtt.bind(this);
  }
  async currentSelectedAtt(currentSelectedVal) {
    let newObj = {};
    newObj = await { ...this.state.currentValsObj, ...currentSelectedVal };
    await this.setState({
      ...this.state,
      currentValsObj: { ...this.state.currentValsObj, ...currentSelectedVal },
    });
    return newObj;
  }
  render() {
    let currentCurrencySymbol = this.props.currentCurrency.split(" ")[0];
    return (
      <div style={{ width: "292px", maxWidth: "292px" }}>
        {/* brand name */}
        <h2>{this.props.item.brand}</h2>
        {/* name */}
        <p>{this.props.item.name}</p>
        {/* attributes */}
        {this.props.item.attributes.map((att, ind) => {
          return (
            <ItemInfoAttribute
              key={att.name + "_" + ind}
              attribute={att}
              theKey={att.name + "__" + ind}
              currentSelectedAtt={this.currentSelectedAtt}
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
        <button
          className="add-remove-btn"
          onClick={() => {
            let selectedAtt = [],
              attNames = Object.keys(this.state.currentValsObj).sort();
            attNames.forEach((name) => {
              selectedAtt.push(this.state.currentValsObj[name]);
            });
            this.props.addSelectedAttToItemInfo(JSON.stringify(selectedAtt));
          }}
        >
          ADD TO CART
        </button>
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
