import React, { Component } from "react";
import CurrencyOption from "./radioitem";
import DownArrow from "./downarrow";

export default class curreny extends Component {
  render() {
    return (
      <div
        className="with-hidden-list"
        style={{
          width: "max-content",
          textAlign: "right",
          fontWeight: "600",
          cursor: "pointer",
          position: "relative",
          backgroundColor: "white",
        }}
        onClick={() => this.props.toggleCurrenciesList()}
      >
        {this.props.currentCurrency.split(" ")[0]}
        <DownArrow showCurrenciesList={this.props.showCurrenciesList} />
        <div
          className={`the-hidden-list${
            this.props.showCurrenciesList ? " active" : ""
          }`}
          style={{
            padding: "10px 0",
            fontSize: "1.125rem",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "114px",
            // filter: "drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19))",
            boxShadow: "0px 4px 35px rgba(168, 172, 176, 0.19)",
            position: "absolute",
            top: "140%",
            zIndex: "3",
            fontWeight: "500",
            opacity: "0",
            pointerEvents: "none",
          }}
        >
          {this.props.allCurrencies.map((oneCurrency) => {
            let [currencyName, sympol] = oneCurrency;
            return (
              <CurrencyOption
                key={currencyName}
                name={`${sympol} ${currencyName}`}
                currentValue={this.props.currentCurrency}
                valueOnChangeHandler={this.props.currencyOnChangeHandler}
                radioSharedName="current-currency"
                // for additional style
                style={{ padding: "10px 0 10px 20px", display: "block" }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
