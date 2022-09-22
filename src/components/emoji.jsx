import React, { Component } from 'react';
import parse from 'html-react-parser';

class Emoji extends Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {}
        };

        this.handleCopy = this.handleCopy.bind(this);
    }

    handleCopy(event) {
        let copied;
        if (event.target.dataset.htmlCode) {
            copied = event.target.dataset.htmlCode;
        } else {
            copied = event.target.dataset.unicode;
        }
        navigator.clipboard.writeText(copied);
        this.setState({
            visibility: 'visible',
            opacity: 1
        });
    }

    render() {
        return (
            <li className='emoji' data-unicode={this.props.info.unicode} data-html-code={this.props.info.htmlCode}>
                {this.props.category === 'flags' ?
                    <div className='emoji-img'>{(this.props.info.htmlCode.length) > 1 ? parse(this.props.info.htmlCode[1]) : parse(this.props.info.htmlCode[0])}</div>
                    : <div className='emoji-img'>{parse(this.props.info.htmlCode[0])}</div>
                }                <div className='emoji-tools'>
                    <i onClick={this.handleCopy} className="fa-solid fa-hashtag" data-html-code={this.props.info.htmlCode} title='HTML code'></i>
                    <i onClick={this.handleCopy} className="fa-solid fa-u" data-unicode={this.props.info.unicode} title='Unicode'></i>
                    <i className="fa-regular fa-heart" title='Favorite'></i>
                    <span style={this.state.style} className='tool-tip-text' id="myTooltip">Copied ✅</span>
                </div>
            </li>
        );
    }
}

export default Emoji;