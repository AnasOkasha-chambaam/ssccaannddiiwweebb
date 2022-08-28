import React, { Component } from "react";

export default class downarrow extends Component {
  render() {
    return (
      <svg
        width="8"
        height="4"
        viewBox="0 0 8 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          marginLeft: "10px",
          transformOrigin: "center",
          transform: this.props.showCurrenciesList ? "rotateZ(180deg)" : "",
        }}
      >
        <path
          d="M1 0.5L4 3.5L7 0.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          id="down_arrow"
        />
      </svg>
    );
  }
}
