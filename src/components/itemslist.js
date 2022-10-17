import React, { Component } from "react";
import ListOfItems from "./listofitems";
export default class ItemsList extends Component {
  render() {
    return (
      <div
        style={{
          padding:
            "calc(80px*var(--factor)) calc(101px*var(--factor)) calc(191px*var(--factor)) calc(101px*var(--factor))",
        }}
      >
        <h1
          key={this.props.currentCategory}
          className="return-to-initial"
          style={{
            fontSize: "2.625rem",
            fontWeight: "500",
            marginBottom: "calc(103px * var(--factor))",
          }}
        >
          {this.props.currentCategory}
        </h1>
        <ListOfItems
          currentCategoryItemsArr={this.props.currentCategoryItemsArr}
          currentCurrency={this.props.currentCurrency}
          cartCurrentItems={this.props.cartCurrentItems}
          deleteTheItem={this.props.deleteTheItem}
        />
      </div>
    );
  }
}
