import React, { Component } from "react";
// import RadioSize from "./radioitem";
import ItemInfoAttribute from "./item_info/iteminfoattribute";

export default class cartItem extends Component {
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
    // this.sizeOnChangeBridge = this.sizeOnChangeBridge.bind(this);
    this.addPiece = this.addPiece.bind(this);
    this.abstractPiece = this.abstractPiece.bind(this);
    this.showNextImg = this.showNextImg.bind(this);
    this.showPrevImg = this.showPrevImg.bind(this);
    this.currentSelectedAtt = this.currentSelectedAtt.bind(this);
  }
  // sizeOnChangeBridge(chosenSize) {
  //   this.props.cartItemOnChangeHandler(
  //     this.props.item.id,
  //     "currentSize",
  //     chosenSize
  //   );
  // }
  addPiece() {
    let newValue = this.props.item.numberOfPieces + 1;
    while (newValue > this.props.item.onStock) {
      alert();
      newValue--;
    }
    this.props.cartItemOnChangeHandler(
      this.props.item.id,
      "numberOfPieces",
      newValue
    );
  }
  abstractPiece() {
    let newValue = this.props.item.numberOfPieces - 1;
    while (newValue <= 0) {
      alert("Do you want to delete the Item?");
      this.props.deleteTheItem(this.props.item.id);
      return;
    }
    this.props.cartItemOnChangeHandler(
      this.props.item.id,
      "numberOfPieces",
      newValue
    );
  }
  showNextImg() {
    let newValue = this.state.currentImage + 1;
    while (newValue > this.props.item.gallery.length - 1) {
      newValue = 0;
    }
    this.setState({ ...this.state, currentImage: newValue });
  }
  showPrevImg() {
    let newValue = this.state.currentImage - 1;
    while (newValue < 0) {
      newValue = this.props.item.gallery.length - 1;
    }
    this.setState({ ...this.state, currentImage: newValue });
  }
  currentSelectedAtt(currentSelectedVal) {
    this.setState({
      ...this.state,
      currentValsObj: {
        ...this.props.item.cartSelectedAtt,
        ...this.state.currentValsObj,
        ...currentSelectedVal,
      },
    });

    this.props.cartItemOnChangeHandler(this.props.item.id, "cartSelectedAtt", {
      ...this.props.item.cartSelectedAtt,
      ...this.state.currentValsObj,
      ...currentSelectedVal,
    });
  }
  render() {
    let currentCurrencySymbol = this.props.currentCurrency.split(" ")[0];
    return (
      <li
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "42px",
        }}
        className={this.props.className ? this.props.className : ""}
      >
        <div
          className="info"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <span>
            <p
              className="brand-name"
              style={{
                display: "block",
                lineHeight: "27px",
                fontWeight: "bold",
              }}
            >
              {this.props.item.brand}
            </p>
            <p className="item-name" style={{ display: "block" }}>
              {this.props.item.name}
            </p>
            <p
              className="item-price"
              style={{ fontWeight: "600", marginTop: "6px" }}
            >
              {currentCurrencySymbol}{" "}
              {this.props.item.prices
                .filter((one) => {
                  return one.currency.symbol === currentCurrencySymbol;
                })
                .map((one) => {
                  return one.amount;
                })}
            </p>
          </span>
          {/* Attributes */}
          {this.props.item.attributes.map((att, ind) => {
            return (
              <ItemInfoAttribute
                key={att.name + "__" + ind}
                attribute={att}
                uniqueRadioSharedName={
                  (this.props.bigCart ? "bigCart_" : "cart_") +
                  this.props.item.id
                }
                theKey={att.name + "_1_" + ind}
                currentSelectedAtt={this.currentSelectedAtt}
                currentValues={this.props.item.cartSelectedAtt}
              />
            );
          })}
          {/* <ul className="sizes" style={{ display: "flex", gap: "8px" }}>
            {this.props.item.sizes.map((size) => {
              return (
                <li key={size} className="size">
                  <RadioSize
                    name={size}
                    currentValue={this.props.item.currentSize}
                    radioSharedName={this.state.componentKey}
                    valueOnChangeHandler={this.sizeOnChangeBridge}
                    labelClassName={"box-with-border"}
                    // for additional style
                    style={{}}
                  />
                </li>
              );
            })}
          </ul> */}
        </div>
        <div
          className="item-number-and-photo"
          style={{ display: "flex", gap: "10px" }}
        >
          <ul
            className="item-number"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            <li
              className="box-with-border"
              onClick={() => this.addPiece()}
              style={{ position: "relative" }}
            >
              <span
                style={{
                  display: "block",
                  width: "9px",
                  height: "1px",
                  backgroundColor: "black",
                }}
              ></span>
              <span
                style={{
                  position: "absolute",
                  display: "block",
                  width: "9px",
                  height: "1px",
                  backgroundColor: "black",
                  transform: "rotate(90deg)",
                }}
              ></span>
            </li>
            <li>{this.props.item.numberOfPieces}</li>
            <li
              className="box-with-border"
              onClick={() => this.abstractPiece()}
            >
              <span
                style={{
                  display: "block",
                  width: "9px",
                  height: "1px",
                  backgroundColor: "black",
                }}
              ></span>
            </li>
          </ul>
          <div className="img">
            {this.props.bigCart && this.props.bigCart === true ? (
              <>
                <span
                  className="a-div forward forward-back-btn"
                  onClick={() => this.showNextImg()}
                >
                  {}
                </span>
                <span
                  className="a-div backward forward-back-btn"
                  onClick={() => this.showPrevImg()}
                >
                  {}
                </span>
              </>
            ) : (
              false
            )}
            {this.props.item.gallery.map((imgInfo, index) => {
              return (
                <img
                  key={this.props.item.id + index}
                  src={imgInfo}
                  alt={this.props.item.name}
                  style={
                    index === this.state.currentImage
                      ? { display: "block", "--u": index }
                      : { display: "none", "--u": index }
                  }
                />
              );
            })}
          </div>
        </div>
      </li>
    );
  }
}
