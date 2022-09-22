import React from 'react';

export default class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    const { item, updateState } = this.props;
    const { open } = this.state;
    const catName = item.name;
    if (item.subcategories) {
      return (
        <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
          <div className="sidebar-title">
            <span
              aria-hidden="true"
              onClick={() => {
                updateState({
                  selectedCategory: item.name,
                  selectedGroup: '',
                });
              }}
            >
              {/* {this.props.item.icon && <i className='fa-light fa-face-smile'></i>} */}
              {item.name}
            </span>
            <i
              aria-hidden="true"
              className="fa-solid fa-chevron-down toggle-btn"
              onClick={() => {
                this.setState({ open: !open });
              }}
            />
          </div>
          <div className="sidebar-content">
            {item.subcategories.map((child) => (
              <Category
                key={child.name}
                item={child}
                updateState={updateState}
                catName={catName}
              />
            ))}
          </div>
        </div>
      );
    }
    // console.log(this.props.updateState)
    return (
      <h3
        aria-hidden="true"
        className="sidebar-item plain"
        onClick={() => {
          updateState({ selectedGroup: item.name, selectedCategory: catName });
        }}
      >
        {/* {this.props.item.icon && <i className={this.props.item.icon}></i>} */}
        {item.name}
      </h3>
    );
  }
}
