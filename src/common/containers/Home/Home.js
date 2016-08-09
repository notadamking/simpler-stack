import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Container } from 'react-semantify';

import { Header, Post, Comments } from '../';
import { Thread } from '../../components';

const styles = StyleSheet.create({
  content: {
    paddingTop: '40px'
  }
});

export default class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const post = <Post postId="7f7ebde0-457d-4c0f-b84f-a60a7c693edd" />;
    const comments = <Comments postId="7f7ebde0-457d-4c0f-b84f-a60a7c693edd" />;
    return (
      <div>
        <Header />
        <Container className={css(styles.content)}>
          <Thread post={post} comments={comments} />
        </Container>
      </div>
    );
  }
}
