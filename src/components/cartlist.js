import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartItems from "./cartitems";
export default class cartList extends Component {
  render() {
    return (
      <div
        className="the-hidden-list"
        style={{
          display: this.props.showCartList ? "block" : "none",
          width: "100%",
          minHeight: "100vh",
          zIndex: "2",
          position: "absolute",
          top: "0",
          bottom: "0",
          right: "0",
          left: "0",
        }}
      >
        <div
          className="black-background"
          onClick={() => this.props.hideCartList()}
          style={{
            width: "100vw",
            minHeight: "100vh",
            height: "100%",
            backgroundColor: "rgba(57, 55, 72, 0.22)",
            position: "fixed",
            zIndex: "-1",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        ></div>
        <div
          className="cart-dropdown"
          style={{
            backgroundColor: "white",
            padding: "8px 16px 20px 16px",
            width: "325px",
            marginRight: "87px",
            position: "absolute",
            top: "80px",
            right: "0",
          }}
        >
          <p style={{ margin: "8px 0 23px 0px" }}>
            <span style={{ fontWeight: "bold" }}>My Bag</span>,{" "}
            {this.props.cartCurrentItems.length} items
          </p>
          <CartItems
            cartCurrentItems={this.props.cartCurrentItems}
            cartItemOnChangeHandler={this.props.cartItemOnChangeHandler}
            currentCurrency={this.props.currentCurrency}
            deleteTheItem={this.props.deleteTheItem}
          />
          <p
            style={{
              fontWeight: "800",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "51px",
              marginBottom: "35px",
            }}
          >
            Total{" "}
            <span className="total-price" style={{ marginBottom: "2px" }}>
              {this.props.cartCurrentInfo.totalNoTaxes
                ? (
                    this.props.cartCurrentInfo.totalNoTaxes() +
                    this.props.cartCurrentInfo.totalNoTaxes() *
                      this.props.cartCurrentInfo.taxes
                  ).toFixed(2)
                : ""}
            </span>
          </p>
          <ul
            style={{
              display: "grid",
              gap: "12px",
              justifyContent: "space-between",
              height: "43px",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <li>
              <Link
                to="/bigcart"
                className="btn box-with-border"
                onClick={() => this.props.hideCartList()}
              >
                VIEW BAG
              </Link>
            </li>
            <li>
              <button className="btn">CHECK OUT</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
