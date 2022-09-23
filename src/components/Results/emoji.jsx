import React, { Component } from "react";
import parse from "html-react-parser";
// import * as Icon from 'react-bootstrap-icons';
import { findFlagUrlByCountryName } from "country-flags-svg";
class Emoji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        visibility: "hidden",
        opacity: 0,
      },
      favorite: {
        value: this.props.isFav,
        style: this.props.isFav
          ? { classes: "fa-solid fa-heart", color: "#E72B11" }
          : { classes: "fa-regular fa-heart", color: "#FFF" },
      },
    };

    this.handleCopy = this.handleCopy.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  handleCopy(event) {
    let copied;
    if (event.target.dataset.htmlCode) {
      copied = event.target.dataset.htmlCode;
    } else if (event.target.dataset.emoji) {
      copied = parse(event.target.dataset.emoji);
    } else {
      copied = event.target.dataset.unicode;
    }
    navigator.clipboard.writeText(copied);

    this.setState({
      style: {
        visibility: "visible",
        opacity: 1,
      },
    });
    setTimeout(() => {
      this.setState({
        style: {
          visibility: "hidden",
          opacity: 0,
        },
      });
    }, "1000");
  }

  handleFavorite() {
    if (this.state.favorite.value) {
      this.setState({
        favorite: {
          value: false,
          style: { classes: "fa-regular fa-heart", color: "#FFF" },
        },
      });
      this.props.removeFromFav(this.props.info);
    } else {
      this.setState({
        favorite: {
          value: true,
          style: { classes: "fa-solid fa-heart", color: "#E72B11" },
        },
      });
      this.props.addToFav(this.props.info);
    }
  }

  render() {
    return (
      <li
        className="emoji"
        data-unicode={this.props.info.unicode}
        data-html-code={this.props.info.htmlCode}
      >
        {this.props.category === "flags" ? (
          <div className="emoji-img custom">
            <img
              src={findFlagUrlByCountryName(
                `${this.props.info.name[0].toUpperCase()}${this.props.info.name.slice(
                  1
                )}`
                  .split(" ")
                  .join("_")
              )}
              alt="flag"
              className="emoji-img"
            />
            {/* {console.log(`${this.props.info.name[0].toUpperCase()}${this.props.info.name.slice(1)}`)} */}
            {console.log(this.props.info)}
          </div>
        ) : (
          <div className="emoji-img">
            {parse(this.props.info.htmlCode.join(""))}
          </div>
        )}
        <div className="emoji-tools">
          <i
            aria-hidden="true"
            onClick={this.handleCopy}
            className="fa-solid fa-hashtag"
            data-html-code={this.props.info.htmlCode.join("")}
            title="copy HTML code"
          />
          <i
            aria-hidden="true"
            onClick={this.handleCopy}
            className="fa-solid fa-u"
            data-unicode={this.props.info.unicode}
            title="copy unicode"
          />
          <i
            onClick={this.handleCopy}
            data-emoji={this.props.info.htmlCode[0]}
            className="fa-regular fa-copy"
            title="copy emoji"
          />
          <i
            onClick={this.handleFavorite}
            style={{ color: this.state.favorite.style.color }}
            className={this.state.favorite.style.classes}
            title={this.state.favorite.value ? 'delete from favourites' : 'add to favourites'}
          />

          <span
            style={{
              visibility: this.state.style.visibility,
              opacity: this.state.style.opacity,
            }}
            className="tool-tip-text"
            id="myTooltip"
          >
            Copied✅
          </span>
        </div>
      </li>
    );
  }
}

export default Emoji;
