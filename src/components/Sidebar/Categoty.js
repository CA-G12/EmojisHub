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
              {item.name[0].toUpperCase()+ item.name.substring(1).split('_').join(' ')}
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
                sub = {true}
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <h3
        aria-hidden="true"
        className="sidebar-item plain"
        onClick={() => {
          if(this.props.sub){
          updateState({
            selectedGroup: item.name,
            selectedCategory: this.props.catName,
          });}
          else{
            updateState({
              selectedGroup: item.name,
              selectedCategory:item.name,
            });
          }
        }}
      >
        {/* {this.props.item.icon && <i className={this.props.item.icon}></i>} */}
        {item.name.split('_').join(' ')[0].toUpperCase()+ item.name.split('_').join(' ').substring(1)}
      </h3>
    );
  }
}
