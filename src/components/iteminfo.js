import React, { Component } from "react";
import ItemImgs from "./itemimgs";
import RightInfo from "./iteminforightside";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export class iteminfo extends Component {
  constructor(props) {
    super(props);
    let pathname = window.location.pathname.split("/"),
      itemId = pathname[pathname.length - 1];
    this.state = { pathname, itemId };
  }
  async componentDidMount() {
    let theItem;
    let results = await client.query({
      query: gql`
        query getProducts {
          categories {
            products {
              id
              brand
              name
              description
              gallery
              attributes {
                id
                type
                name
                items {
                  id
                  value
                  displayValue
                }
              }
              prices {
                amount
                currency {
                  label
                  symbol
                }
              }
            }
          }
        }
      `,
    });
    let i = 0;
    let ii = 0;
    let searching = true;
    while (i < results.data.categories.length && searching) {
      while (
        ii < Object.values(results.data.categories[i])[1].length &&
        searching
      ) {
        if (
          Object.values(results.data.categories[i])[1][ii].id ===
          this.state.itemId
        ) {
          theItem = Object.values(results.data.categories[i])[1][ii];
          searching = false;
          break;
        }

        ii++;
      }
      i++;
    }
    this.setState({ ...this.state, theItem });
  }
  render() {
    // const search = this.props.location.search;
    // const name = new URLSearchParams(search);
    if (this.state.theItem && this.state.theItem.name) {
      return (
        <div
          className="item-info"
          style={{
            padding: "80px 0 72px 100px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ItemImgs
            imgsArr={
              this.state.theItem && this.state.theItem.gallery
                ? this.state.theItem.gallery.map((one, i) => [
                    one,
                    `_${i + "" + Math.floor(Math.random() * 1000)}`,
                  ])
                : []
            }
            itemId={this.state.itemId ? this.state.itemId : ""}
          />
          <RightInfo
            item={this.state.theItem}
            currentCurrency={this.props.currentCurrency}
            categoryItem={this.state.theItem}
          />
        </div>
      );
    } else {
      return (
        <h1
          style={{ margin: "auto", textAlign: "center" }}
        >{`Nothing To Show`}</h1>
      );
    }
  }
}

export default iteminfo;
