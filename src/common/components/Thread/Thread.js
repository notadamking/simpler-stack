import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Button, Icon, Divider, Item, Segment, Header } from 'react-semantify';

const styles = StyleSheet.create({
  thread: {
    wordSpacing: '2px'
  }
});

const Thread = (props) => {
  Thread.propTypes = {
    post: PropTypes.element.isRequired,
    comments: PropTypes.element
  };

  return (
    <div className={css(styles.thread)}>
      {props.post}
      {props.comments && props.comments}
    </div>
  );
};

export default Thread;
