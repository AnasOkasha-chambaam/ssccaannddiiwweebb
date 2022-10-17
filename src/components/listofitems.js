import React, { Component } from "react";
import SingleItem from "./singleitem";

export default class ListOfItems extends Component {
  render() {
    return (
      <ul
        className="current-items"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          rowGap: "97.56px",
          columnGap: "37.89px",
          fontSize: "1.125rem",
        }}
      >
        {this.props.currentCategoryItemsArr &&
        this.props.currentCategoryItemsArr.length > 0
          ? this.props.currentCategoryItemsArr.map((categoryItem) => {
              return (
                <SingleItem
                  key={categoryItem.id}
                  currentCurrency={this.props.currentCurrency}
                  categoryItem={categoryItem}
                  onCart={
                    this.props.cartCurrentItems.filter((one) => {
                      return one.id === this.state.itemId;
                    }).length !== 0
                  }
                  deleteTheItem={this.props.deleteTheItem}
                />
              );
            })
          : "Nothing to show"}

        {/* <li
          className="item-cart"
          style={{
            // backgroundColor: "green",
            width: "100%",
            height: "444px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <img
            src="./images/Product_D_apollo.png"
            alt="poqoguweh pwoih"
            width="100%"
            height="85%"
            style={{ display: "block" }}
          />
          <div>
            <p style={{ padding: "2px 0" }}>Apollo Running Shot</p>
            <p style={{ fontWeight: "600" }}>$50.00</p>
          </div>
        </li> */}
      </ul>
    );
  }
}
