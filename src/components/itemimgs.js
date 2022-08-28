import React, { Component } from "react";

export class itemimgs extends Component {
  constructor(props) {
    super(props);
    this.state = { currentImgSrc: this.props.imgsArr[0][0] };
    this.changeCurrentImg = this.changeCurrentImg.bind(this);
  }
  changeCurrentImg(src) {
    this.setState({ currentImgSrc: src });
  }
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ul
          className="imgs"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {this.props.imgsArr.map((img) => (
            <img
              src={img[0]}
              alt={this.props.itemId}
              key={"_" + img[1] + "_img_" + this.props.itemId}
              onClick={() => this.changeCurrentImg(img[0] ? img[0] : "404")}
              width={"80px"}
              height={"80px"}
              style={{
                objectFit: "contain",
                cursor: "pointer",
                marginBottom: "32px",
              }}
            />
          ))}
        </ul>
        <img
          src={this.state.currentImgSrc}
          alt={this.props.itemId}
          width="610px"
          height="510px"
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }
}

export default itemimgs;
