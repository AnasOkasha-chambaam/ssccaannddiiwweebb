import React, { Component } from "react";

// name: the item name (it will be compared to current value)
// radioSharedName: the name that the radio items share
export default class RadioItem extends Component {
  render() {
    let itemStyle = { cursor: "pointer", ...this.props.style },
      checked =
        this.props.currentValue.toUpperCase() === this.props.name.toUpperCase()
          ? true
          : false;
    return (
      <div className="radio-item">
        <label
          htmlFor={
            this.props.radioSharedName +
            "_" +
            this.props.name.replace(/\s+/g, "_").toLowerCase()
          }
          style={itemStyle}
          className={
            (this.props.labelClassName ? this.props.labelClassName : "") +
            (checked ? " active" : "")
          }
        >
          {this.props.children
            ? this.props.children
            : this.props.name[0] === "#"
            ? ""
            : this.props.name.toUpperCase()}
        </label>
        <input
          type="radio"
          name={this.props.radioSharedName}
          id={
            this.props.radioSharedName +
            "_" +
            this.props.name.replace(/\s+/g, "_").toLowerCase()
          }
          style={{ display: "none" }}
          checked={checked}
          onChange={() => this.props.valueOnChangeHandler(this.props.name)}
        />
      </div>
    );
  }
}
