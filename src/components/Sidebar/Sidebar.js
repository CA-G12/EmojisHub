import React from "react";
import items from "../../data/data.json";
import Category from "./Categoty";

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <h2 className="sidebar-item logo">EmojiHub</h2>
        <h2
          className="sidebar-item fav"
          onClick={() => {
            console.log("fav clicked");
            this.props.updateState({ selectedCategory: "favourite" });
          }}
        >
          Favourites
        </h2>
        <h2 className="sidebar-item fav" 
        onClick={() => {
            this.props.updateState({ selectedCategory: "All" });
          }}>Categories</h2>
        {items.map((item, index) => {
          return (
            <Category
              key={index}
              item={item}
              updateState={this.props.updateState}
            />
          );
        })}
      </div>
    );
  }
}
