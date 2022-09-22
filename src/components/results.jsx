import React, { Component } from 'react';
import Emoji from './emoji.jsx';
import { getAll, getRandomInCategory, getRandomInGroup, getAllInCategory, getAllInGroup } from '../helpers/requests.js'
class Results extends Component {
    state = {
        data: null,
        loading: true
    }
    componentDidMount() {
        if (this.props.category === 'All') {
            getAll().then(response => this.setState({ data: response }));
        } else if (this.props.category && this.props.group) {
            getAllInGroup(this.props.group).then(response => this.setState({ data: response }));
        }else if(this.props.group){
            getRandomInGroup(this.props.group).then(response => this.setState({ data: response }));
        }
        else {
            getRandomInCategory(this.props.category).then(response => this.setState({ data: response }));
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <section className='results'>
                <h1 className='result-header'>{this.props.category ? this.props.category : ''}/{this.props.group ? this.props.group : ''}</h1>
                <p className={this.props.category === 'All' ? 'hint-text' : ''}>{this.props.category === 'All' ? 'Choose category to see specific emojis.' : ''}</p>
                <p className='hint-text'>
                    <span className='orange-hint'><i className="fa-solid fa-hashtag"></i></span>to copy HTML code.
                    <span className='orange-hint'><i className="fa-solid fa-u"></i></span>to copy unicode.
                    <span className='orange-hint'><i className="fa-regular fa-heart"></i></span>to add icon to favorite list.</p>
                <ul className='results-container'>
                    {
                        this.state.loading || !this.state.data ? <h3>Loading....</h3> : this.state.data.map((emoji, index) => {

                            return <Emoji category={this.props.category} info={emoji} key={index} />

                        })
                    }
                </ul>
            </section>
        );
    }
}

export default Results;