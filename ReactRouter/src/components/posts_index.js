import React from 'react';
import {connect} from 'react-redux';
import { fetchPosts } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

//onsole.log(fetchPosts())

class PostsIndex extends React.Component {
    componentDidMount() {
        this.props.fetchPosts();
    }


    renderPosts() {
        
        return Object.keys(this.props.posts).map(key => {
            const post = this.props.posts[key];
                return (
                <li key={post.id} className="list-group-item">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
                );
        });
    }

    render () {
        return (
             <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a post
                    </Link>
                </div>
           
                <h3>Posts</h3>
                <ul className="list-group">
                    { this.renderPosts() }
                </ul>
            </div>
        );
    }
}


function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);