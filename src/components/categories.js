import React, { Component } from "react";
import { Link } from "react-router-dom";
import Category from "./radioitem";

export default class categories extends Component {
  render() {
    return (
      <div
        className="categories"
        style={{
          display: "flex",
        }}
      >
        {this.props.mainCategories.map((category) => {
          return (
            <Category
              key={category}
              name={category}
              currentValue={this.props.currentCategory}
              valueOnChangeHandler={this.props.categoryOnChangeHandler}
              radioSharedName="current-category"
            >
              <Link
                to={"/" + category}
                onClick={() => this.props.setCurrentCategory(category)}
                style={{
                  padding:
                    "calc(4px*var(--factor)) calc(32px*var(--factor)) 0 calc(32px*var(--factor))",
                  cursor: "pointer",
                  display: "inline-block",
                  height: "calc(56px*var(--factor))",
                  letterSpacing: "0.12px",
                }}
              >
                {category}
              </Link>
            </Category>
          );
        })}
      </div>
    );
  }
}
