import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header } from '../';

const styles = StyleSheet.create({
  app: {
    fontFamily: 'Lato'
  },
  content: {
    paddingTop: '40px'
  }
});

const App = (props) => {
  App.propTypes = {
    children: PropTypes.element.isRequired
  };
  return (
    <div className={css(styles.app)}>
      <Header />
      <div className={css(styles.content)}>
        {props.children}
      </div>
    </div>
  );
};

export default App;
