import React, { Component } from "react";
import Emoji from "./emoji";
import {
  getAll,
  getAllInCategory,
  getAllInGroup,
} from "../../helpers/requests";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      favourites: [],
    };
  }
  addToFav = (emoji) => {
    const favArray = JSON.parse(localStorage.getItem("fav")) || [];
    favArray.push(emoji);
    localStorage.setItem("fav", JSON.stringify(favArray));
    this.setState((prevState) => ({
      favourites: JSON.parse(localStorage.getItem("fav")),
    }));
  };
  removeFromFav = (emoji) => {
    const favArray = JSON.parse(localStorage.getItem("fav")).filter(
      (e) => e.htmlCode[0] !== emoji.htmlCode[0]
    );
    localStorage.setItem("fav", JSON.stringify(favArray));
    this.setState({ favourites: favArray });
  };

  componentDidMount() {
    localStorage.setItem("fav", JSON.stringify(this.state.favourites));
    getAll().then((response) => {
      this.setState({ data: response });
    });
    this.setState({ loading: false });
  }
  componentDidUpdate(prevProps, prevState) {
    const { category, group } = this.props;
    if (prevProps !== this.props) {
      if (category === "All") {
        getAll().then((response) => {
          this.setState({ data: response });
        });
      } else if (category === "favourite") {
        this.setState({ data: this.state.favourites });
      } else if (category && group) {
        getAllInGroup(group).then((response) =>
          this.setState({ data: response })
        );
      } else if (group) {
        getAllInGroup(group).then((response) =>
          this.setState({ data: response })
        );
      } else {
        getAllInCategory(category).then((response) =>
          this.setState({ data: response })
        );
      }
      this.setState({ loading: false });
    } else {
      return;
    }
  }

  render() {
    const { category, group } = this.props;
    const { loading, data } = this.state;
    return (
      <section className="results">
        <h1 className="result-header">
          {category || ""}/{group || ""}
        </h1>
        <p className={category === "All" ? "hint-text" : ""}>
          {category === "All" ? "Choose category to see specific emojis." : ""}
        </p>
        <p className="hint-text">
          <span className="orange-hint">
            <i className="fa-solid fa-hashtag" />
          </span>
          to copy HTML code.
          <span className="orange-hint">
            <i className="fa-solid fa-u" />
          </span>
          to copy unicode.
          <span className="orange-hint">
            <i className="fa-regular fa-copy"></i>
          </span>
          copy emoji.
          <span className="orange-hint">
            <i className="fa-regular fa-heart" />
          </span>
          to add icon to favorite list.
        </p>
        <ul className="results-container">
          {loading || !data ? (
            <h3>Loading....</h3>
          ) : (
            data.map((emoji) => (
              <Emoji
                category={category}
                info={emoji}
                key={emoji.htmlCode}
                addToFav={this.addToFav}
                removeFromFav={this.removeFromFav}
                isFav={
                  this.state.favourites
                    .map((e) => e.htmlCode[0])
                    .indexOf(emoji.htmlCode[0]) === -1
                    ? false
                    : true
                }
              />
            ))
          )}
        </ul>
      </section>
    );
  }
}

export default Results;