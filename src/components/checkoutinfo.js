import React, { PureComponent } from "react";

export class checkoutinfo extends PureComponent {
  render() {
    return (
      <li
        style={{
          display: "flex",
          marginBottom: "42px",
          flexDirection: "column",
          gap: 8,
        }}
        className={this.props.className ? this.props.className : ""}
      >
        <p>
          Tax {this.props.taxes * 100}%:{" "}
          <span style={{ fontWeight: "bold" }}>
            {(this.props.taxes * this.props.totalNoTaxes).toFixed(2)}
          </span>
        </p>
        <p>
          Quantity:
          <span style={{ fontWeight: "bold" }}>{this.props.quantity}</span>
        </p>
        <p>
          Total:{" "}
          <span style={{ fontWeight: "bold" }}>
            {(
              this.props.totalNoTaxes +
              this.props.totalNoTaxes * this.props.taxes
            ).toFixed(2)}
          </span>
        </p>
        <button
          style={{
            fontFamily: "Raleway",
            fontSize: "14px",
            width: "279px",
            height: "43px",
            backgroundColor: "#5ECE7B",
            border: "0",
            color: "#fff",
            marginTop: "8px",
            cursor: "pointer",
          }}
        >
          ORDER
        </button>
      </li>
    );
  }
}

export default checkoutinfo;
