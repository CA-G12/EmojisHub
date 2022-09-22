import React, { Component } from 'react';
import parse from 'html-react-parser';

class Emoji extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {
        visibility: 'hidden',
        opacity: 0,
      },
      favorite: {
        value: false,
        style: {
          classes: 'fa-regular fa-heart',
          color: '#FFF'
        }
      }
    };

    this.handleCopy = this.handleCopy.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);

  }

  handleCopy(event) {
    let copied;
    if (event.target.dataset.htmlCode) {
      copied = event.target.dataset.htmlCode;
    } else if (event.target.dataset.readme) {

      copied = event.target.dataset.readme;
    }
    else {
      copied = event.target.dataset.unicode;
    }
    navigator.clipboard.writeText(copied);

    this.setState({
      style: {
        visibility: 'visible',
        opacity: 1
      }
    });
    setTimeout(() => {
      this.setState({
        style: {
          visibility: 'hidden',
          opacity: 0
        }
      })
    }, '1000')
  }

  handleFavorite() {
    if (this.state.favorite.value) {
      this.setState({ favorite: { value: false, style: { classes: 'fa-regular fa-heart', color: '#FFF' } } })
    } else {
      this.setState({ favorite: { value: true, style: { classes: 'fa-solid fa-heart', color: '#ffa600cd' } } })
    }
  }

  render() {
    return (
      <li
        className="emoji"
        data-unicode={this.props.info.unicode}
        data-html-code={this.props.info.htmlCode}
      >
        {this.props.category === 'flags' ? (
          <div className="emoji-img">
            {this.props.info.htmlCode.length > 1
              ? parse(this.props.info.htmlCode[1])
              : parse(this.props.info.htmlCode[0])}
          </div>
        ) : (
          <div className="emoji-img">{parse(this.props.info.htmlCode[0])}</div>
        )}{' '}
        <div className="emoji-tools">
          <i
            aria-hidden="true"
            onClick={this.handleCopy}
            className="fa-solid fa-hashtag"
            data-html-code={this.props.info.htmlCode}
            title="HTML code"
          />
          <i
            aria-hidden="true"
            onClick={this.handleCopy}
            className="fa-solid fa-u"
            data-unicode={this.props.info.unicode}
            title="Unicode"
          />
          <i onClick={this.handleCopy} id='github' data-readme={`amp;${this.props.info.htmlCode[0]}`}
            className="fa-brands fa-github" title='Readme file' />

          <i onClick={this.handleFavorite} style={{ color: this.state.favorite.style.color }}
            className={this.state.favorite.style.classes} title='Favorite' />


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



