import React, { Component } from 'react';
import parse from 'html-react-parser';

class Emoji extends Component {
    // state = {  } 
    render() {
        return (
            <li className='emoji' data-unicode={this.props.info.unicode} data-html-code={this.props.info.htmlCode}>
                {this.props.category === 'flags' ?
                    <div className='emoji-img'>{(this.props.info.htmlCode.length) > 1 ? parse(this.props.info.htmlCode[1]) : parse(this.props.info.htmlCode[0])}</div>
                    : <div className='emoji-img'>{parse(this.props.info.htmlCode[0])}</div>
                }                <div className='emoji-tools'>
                    <i className="fa-solid fa-hashtag" title='HTML code'></i>
                    <i className="fa-solid fa-u" title='Unicode'></i>
                    <i className="fa-regular fa-heart" title='Favorite'></i>
                </div>
            </li>
        );
    }
}

export default Emoji;