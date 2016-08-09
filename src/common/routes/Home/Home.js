import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Container } from 'react-semantify';

import { Header } from '../../containers';

const styles = StyleSheet.create({
  content: {
    paddingTop: '40px'
  }
});

const Home = props => {
  return (
    <div>
      <Header />
      <Container className={css(styles.content)} />
    </div>
  );
};

export default Home;
