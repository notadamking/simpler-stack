import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Image, Button, Icon, Divider, Items, Segment, Header } from 'react-semantify';
import TimeAgo from 'react-timeago';

const styles = StyleSheet.create({
  description: {
    fontSize: '16px',
    paddingBottom: '20px',
  }
});

export default class Comment extends Component {
  static propTypes = {
    author: PropTypes.string,
    createdAt: PropTypes.string,
    description: PropTypes.string,
  };

  static defaultProps = {
    author: 'that other guy',
    description: `Holy cow! That is really cool!`,
    createdAt: 'Mon Aug 08 2016 15:23:27 GMT-0600 (MDT)'
  };

  render() {
    const { author, description, createdAt } = this.props;
    return (
      <Segment className="padded raised">
        <Items>
          <div className="item">
            <img className="ui avatar image" src="/images/person.jpg" />
            <div className="content">
              <div className="meta">
                <a href="#"><strong>{author && author}</strong></a> &bull; {createdAt && <TimeAgo date={createdAt} />}
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
                <Button className="compact inverted primary icon">
                  <Icon className="reply" />
                </Button>
                <Button className="compact inverted secondary icon">
                  <Icon className="chat" />
                </Button>
              </div>
            </div>
          </div>
        </Items>
      </Segment>
    );
  }
}
