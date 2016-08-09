import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Button, Icon, Segment, Form } from 'react-semantify';

const styles = StyleSheet.create({
});

export default class CommentBox extends Component {
  static propTypes = {
    classNames: PropTypes.string
  };

  render() {
    return (
      <Form>
        <div className="field">
          <textarea className={this.props.classNames && this.props.classNames}/>
        </div>
        <Button className="green">
          Submit
        </Button>
      </Form>
    );
  }
}
