# simpler stack
### ***simpler stack*** is a universal javascript full-stack framework built on the best of the latest web technologies like React, Redux, GraphQL, RethinkDB, Apollo, Express, and Webpack
The goal when creating this universal javascript stack was to greatly decrease the size of the boilerplate on a new project, but also include the best of the newest technologies available. It can be a lot to digest at first, but you'll be amazed at how *simple* and quick the development process is when using this stack.

![simpler-stack-logos](https://cloud.githubusercontent.com/assets/14098106/17431491/7ecd18ba-5ab7-11e6-902a-253e39aa3e6a.png)

*special thanks to [mattkrick](https://github.com/mattkrick) for this comparison table, which is borrowed from his [meatier repo](https://github.com/mattkrick/meatier)*

| Problem           | Meteor's solution                                               | simpler's solution                                                         | Motivation                                                              |
|-------------------|-----------------------------------------------------------------|---------------------------------------------------------------------|---------------------------------------------------------------------|
| Database          | [MongoDB](https://www.mongodb.org/)                             | [RethinkDB](https://www.rethinkdb.com/)                             | pub/sub, nice web GUI, easy clustering                 |
| Database schema   | [Simple Schema](https://github.com/aldeed/meteor-simple-schema) | [GraphQL](https://github.com/graphql/graphql-js) / [ApolloServer](https://github.com/apollostack/apollo-server)                    | ApolloServer allows us to use shorthand schema language                        |
| Client validation | [Simple Schema](https://github.com/aldeed/meteor-simple-schema) | [validator.js](https://github.com/chriso/validator.js)                                | extremely simple client-side validation       |
| Database hooks    | [Collections2](https://github.com/aldeed/meteor-collection2)    | [GraphQL](https://github.com/graphql/graphql-js)                    | who isn't using GraphQL anymore?      |
| Forms             | [AutoForm](https://github.com/aldeed/meteor-autoform)           | [redux-form](https://github.com/erikras/redux-form)                 | automatic form validation, nice form state management        |
| Client-side cache | [Minimongo](https://www.meteor.com/mini-databases)              | [redux](http://redux.js.org/)                                       | time travel, redo/undo, unidirectional data-flow               |
| Socket server     | [DDP-server](https://www.meteor.com/ddp)                        | [socket.io](http://socket.io/)                        | socket.io v1.0 is out, so that's cool                        |
| Authentication    | Meteor accounts                                                 | [JWTs](https://jwt.io)                                              | simple and efficient                  |
| Auth-transport    | [DDP](https://www.meteor.com/ddp)                               | [ApolloClient](https://github.com/apollostack/apollo-client) (via HTTP fetch) | ApolloClient gives some relay-like features without all the bloat                                 |
| Front-end         | [Blaze](https://www.meteor.com/blaze)                           | [React](https://facebook.github.io/react/)                          | React is the future of UI development                     |
| Build system      | meteor                                                          | [webpack](https://webpack.github.io/)                               | Webpack to simplify building all the things                         |
| CSS               | magically bundle & serve                                        | [aphrodite](https://github.com/khan/aphrodite)           |  inline styles, all the features of sass, works with server rendering |
| Optimistic UI     | latency compensation                                            | [ApolloClient](https://github.com/apollostack/apollo-client)  | optimistic ui with automatic rollback | 
| Testing           | Velocity (or nothing at all)                                    | [karma](https://github.com/karma-runner/karma) / [mocha](https://github.com/mochajs/mocha) / [chai](https://github.com/chaijs/chai) / [enzyme](https://github.com/airbnb/enzyme)                          | JQuery-like selectors, automatic test re-run on code change, simple assertions         |
| Linting           | Your choice                                                     | [eslint](https://github.com/eslint/eslint)                              | the industry standard, live linting with atom plugin 'linter-eslint'                                          |
| Routing           | [FlowRouter](https://github.com/kadirahq/flow-router)           | [react-router-redux](https://github.com/reactjs/react-router-redux) | ssr capable react router, async routes |
| Server            | Node 0.10.41                                                    | Node 5                                                              | ...                                |                             |
 
## Installation
- `brew install rethinkdb`
- `rethinkdb` (in second terminal window)
- `git clone` this repo
- `cd simpler-stack`
- `npm install`

## Development
- `npm run dev` (hot reloaded dev server)

## Production
- `npm run build` 
- `npm run start`

## Similar Projects
 - https://github.com/erikras/react-redux-universal-hot-example (Huge motivation for the architecture of this stack, this was the original boilerplate forked to create this stack)
 - https://github.com/mattkrick/meatier (Another big motivation, but over complex. I also borrowed the table above from this repo)
 - https://github.com/kriasoft/react-starter-kit
 - https://github.com/GordyD/3ree

## Contributing
 - This project is massively outdated and could do with an overhaul, but unfortunately I am too busy with other projects at this time to update it myself. I am willing to review/accept any pull requests!
  
## License
MIT
