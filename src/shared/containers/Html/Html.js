import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import { RouterContext } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import { StyleSheetServer } from 'aphrodite';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    store: PropTypes.object,
    client: PropTypes.object,
    renderProps: PropTypes.object
  };

  render() {
    const { assets, store, client, renderProps } = this.props;
    const head = Helmet.rewind();

    const component = (
      <ApolloProvider client={client} store={store}>
        <RouterContext {...renderProps}/>
      </ApolloProvider>
    );

    const { html, css } = StyleSheetServer.renderStatic(() => {
      return renderToString(component);
    });

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script type="text/javascript" src="//code.jquery.com/jquery-1.10.0.min.js" />
          <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" />
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.js" />
          <style data-aphrodite dangerouslySetInnerHTML={{__html: css.content}}/>
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: html}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script dangerouslySetInnerHTML={{__html: `window.renderedClassNames=${JSON.stringify(css.renderedClassNames)};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
