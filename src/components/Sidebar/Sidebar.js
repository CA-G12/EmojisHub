/* eslint-disable no-trailing-spaces */
import React from 'react';
import items from '../../data/data.json';
import Category from './Categoty';

function Sidebar({ updateState }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-item logo">EmojiHub &#128526;</h2>
      <h2
        aria-hidden="true"
        className="sidebar-item fav"
        onClick={() => {
          updateState({ selectedCategory: 'favourite', selectedGroup: '' });
        }}
      >
        Favourites
      </h2>
      <h2
        aria-hidden="true"
        className="sidebar-item fav"
        onClick={() => {
          updateState({ selectedCategory: 'All' });
        }}
      >
        Categories
      </h2>
      {items.map((item) => (
        <Category key={item.name} item={item} updateState={updateState} />
      ))}
    </div>
  );
}

export default Sidebar;
