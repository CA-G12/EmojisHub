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
      favourites: JSON.parse(localStorage.getItem("fav")) || [],
    };
  }
  addToFav = (emoji) => {
    const favArray = JSON.parse(localStorage.getItem("fav")) || [];
    favArray.push(emoji);
    localStorage.setItem("fav", JSON.stringify(favArray));
    this.setState((prevState) => ({
      favourites: favArray,
    }));
  };
  removeFromFav = (emoji) => {
    const favArray = JSON.parse(localStorage.getItem("fav")).filter(
      (e) => e.htmlCode[0] !== emoji.htmlCode[0]
    );
    localStorage.setItem("fav", JSON.stringify(favArray));
    this.setState({ favourites: favArray });
  };
  getRequiredData() {
    const { category, group } = this.props;
    if (category === "All") {
      this.setState({ loading: true });
      console.log("in all", this.state.loading);

      getAll()
        .then((response) => {
          this.setState({ data: response });
        })
        .then(() => this.setState({ loading: false }));
    } else if (category === "favourite") {
      this.setState({ data: this.state.favourites });
    } else if (category && group) {
      this.setState({ loading: true });
      getAllInGroup(group)
        .then((response) => this.setState({ data: response }))
        .then(() => this.setState({ loading: false }));
    } else {
      this.setState({ loading: true });
      getAllInCategory(category)
        .then((response) => this.setState({ data: response }))
        .then(() => this.setState({ loading: false }));
    }
  }
  componentDidMount() {
    this.getRequiredData();
  }
  componentDidUpdate(prevProps, prevState) {
    const { category } = this.props;

    if (prevProps !== this.props) {
      this.getRequiredData();
    }
    if (
      category === "favourite" &&
      this.state.favourites !== prevState.favourites
    ) {
      this.setState({ data: this.state.favourites });
    }
  }

  render() {
    const { category, group } = this.props;
    const { loading, data } = this.state;
    return (
      <section className="results">
        <h1 className="result-header">
          {category
            ? category[0].toUpperCase() +
              category.substring(1).split("_").join(" ")
            : ""}
          {group
            ? "  >>>  " +
              group[0].toUpperCase() +
              group.substring(1).split("_").join(" ")
            : ""}
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
