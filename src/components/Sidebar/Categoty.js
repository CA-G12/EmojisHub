import React from "react";

export default class Category extends React.Component {
  state = {
    open: false,
  };
  render() {
    const catName = this.props.item.name;
    if (this.props.item.subcategories) {
      return (
        <div className={this.state.open ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span
              onClick={() => {
                this.props.updateState({
                  selectedCategory: this.props.item.name,
                });
                this.props.updateState({ selectedGroup: "" });
              }}
            >
              {/* {this.props.item.icon && <i className='fa-light fa-face-smile'></i>} */}
              {this.props.item.name}
            </span>
            <i
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => {
                this.setState({ open: !this.state.open });
              }}
            ></i>
          </div>
          <div className="sidebar-content">
            {this.props.item.subcategories.map((child, index) => (
              <Category
                key={index}
                item={child}
                updateState={this.props.updateState}
                catName={catName}
              />
            ))}
          </div>
        </div>
      );
    } else {
      // console.log(this.props.updateState)
      return (
        <h3
          className="sidebar-item plain"
          onClick={() => {
            console.log(this.props.updateState);
            this.props.updateState({ selectedGroup: this.props.item.name });
            this.props.updateState({ selectedCategory: this.props.catName });
          }}
        >
          {/* {this.props.item.icon && <i className={this.props.item.icon}></i>} */}
          {this.props.item.name}
        </h3>
      );
    }
  }
}
