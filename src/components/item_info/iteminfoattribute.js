import React, { PureComponent } from "react";
import RadioAttValue from "../radioitem";

export class iteminfoattribute extends PureComponent {
  constructor(props) {
    super(props);
    let statate = {};
    statate[`current${this.props.attribute.name}`] =
      this.props.attribute.items[0].value;
    this.state = { ...statate };
    this.attValueOnChangeHandler = this.attValueOnChangeHandler.bind(this);
    this.props.currentSelectedAtt(statate);
  }
  async attValueOnChangeHandler(newValue) {
    let statate = {};
    statate[`current${this.props.attribute.name}`] = newValue;
    await this.setState({ ...statate });
    await this.props.currentSelectedAtt(this.state);
  }
  render() {
    return (
      <div
        className="item-attribute"
        key={this.props.theKey}
        style={{ marginTop: "24px" }}
      >
        <p
          className="att"
          style={{
            display: "inline-block",
            marginBottom: "8px",
            fontFamily: "Roboto Condensed",
          }}
        >
          {this.props.attribute.name}:
        </p>
        <ul
          className={this.props.attribute.name.toLowerCase() + "s"}
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          {this.props.attribute.items.map((attValueObj, ind) => {
            let extraStyle = {
              padding: "14px 23px",
              fontFamily: "'Source Sans Pro', sans-serif",
            };
            if (this.props.attribute.type === "swatch") {
              extraStyle["backgroundColor"] = attValueObj.value;
            }
            return (
              <li key={this.props.attribute.id + "___" + ind}>
                <RadioAttValue
                  name={attValueObj.value}
                  currentValue={
                    this.state[`current${this.props.attribute.name}`]
                  }
                  radioSharedName={this.props.attribute.name}
                  valueOnChangeHandler={this.attValueOnChangeHandler}
                  labelClassName={`box-with-border attribute ${this.props.attribute.type}`}
                  style={extraStyle}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default iteminfoattribute;
