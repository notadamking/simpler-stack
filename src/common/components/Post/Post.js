import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import { Grid, Column, Button, Icon, Divider, Items, Segment, Header } from 'react-semantify';
import TimeAgo from 'react-timeago';

import { CommentBox } from '../';

const styles = StyleSheet.create({
  description: {
    fontSize: '16px',
    paddingBottom: '20px',
  },
  commentBox: {
    width: '600px',
    height: '120px',
  }
});

export default class Post extends Component {
  static propTypes = {
    author: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    showCommentBox: PropTypes.bool
  };

  static defaultProps = {
    author: 'that guy',
    title: 'Some title',
    description: 'Pretty decent eh?',
    createdAt: 'Mon Aug 08 2016 15:23:27 GMT-0600 (MDT)',
    showCommentBox: false
  };

  render() {
    const { author, title, description, createdAt, showCommentBox } = this.props;
    return (
      <Segment className="padded raised">
        <Items>
          <div className="item">
            <div className="ui tiny image m-b-1">
              <img className="avatar" src="/images/person.jpg" />
            </div>
            <div className="content">
              <a className="header" href="#">
                {title && title}
              </a>
              <div className="meta">
                by <a href="#"><strong>{author && author}</strong></a> &bull; {<TimeAgo date={createdAt} />}
              </div>
              <Divider />
              <div className="description">
                <p className={'large ' + css(styles.description)}>
                  {description && description}
                </p>
              </div>
              <div className="extra">
                <Button className="compact green inverted icon">
                  <Icon className="thumbs up" />
                </Button>
                <Button className="compact red inverted icon">
                  <Icon className="thumbs down" />
                </Button>
                <Button className="compact inverted secondary icon">
                  <Icon className="chat" />
                </Button>
                {showCommentBox && <CommentBox classNames={css(styles.commentBox)} />}
              </div>
            </div>
          </div>
        </Items>
      </Segment>
    );
  }
}
