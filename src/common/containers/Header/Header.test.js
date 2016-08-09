import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { browserHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import createStore from '../../redux/store';
import ApolloClient from '../../utils/ApolloClient';
import Header from './Header';
import NavBar from '../../components/NavBar/NavBar';

// console.log('n: ', NavBar);
// console.log('h: ', Header);
//
// describe('Container::Header', () => {
//   let wrapper;
//   before(() => {
//     const client = ApolloClient();
//     const store = createStore(browserHistory, client, window.__data);
//     console.log('c: ', client);
//     console.log('s: ', store);
//     wrapper = mount(
//       <ApolloProvider client={client} store={store}>
//         <Header />
//       </ApolloProvider>
//     );
//     console.log('w: ', wrapper);
//   });
//
//   it('renders a NavBar component', () => {
//     expect(wrapper).to.contain(<NavBar />);
//   });
// });
