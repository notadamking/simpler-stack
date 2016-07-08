import React, { Component, PropTypes } from 'react';
import { Grid, Column, Button, Icon, Card } from 'react-semantify';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
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
    );
  }
}
