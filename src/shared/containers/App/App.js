import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  app: {
    fontFamily: 'Lato'
  }
});

const App = (props) => {
  App.propTypes = {
    children: PropTypes.element.isRequired
  };
  return (
    <div className={css(styles.app)}>
      {props.children}
    </div>
  );
};

export default App;
