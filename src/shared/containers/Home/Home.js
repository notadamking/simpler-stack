import React, { Component, PropTypes } from 'react';
import { Grid, Column, Button, Icon, Card } from 'react-semantify';
import { StyleSheet, css } from 'aphrodite';

import { Header } from '../';

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
    return (
      <div styles={css(styles.content)}>
        <Header />
        <Grid className="centered four column">
          <Column>
            <Button className="labeled icon blue">
              <Icon className="plus" /> add todo
            </Button>
          </Column>
          <Column />
          <Column />
          <Column />
        </Grid>
      </div>
    );
  }
}
