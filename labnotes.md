# 25 October 2019 Notes

## Mongoose Virtuals

- Let's us populate a virtual field that doesn't formally exist on the schema
- We can combine lifecycle hooks to take fields that match on seperate models and associate them

## GraphQL

- Graphql is an alternative to REST:
  - While REST has a huge list of enpoints and methods, Graphql says:
    - Let's just use one endpoint and one method, let the user specify exactly what they want
    - Graphql functions by letting developers specify a schema, which has a list of queries that can be performed on data, and their respective resolvers
    - Resolvers is just whatever operations are needed to fulfill a query

```js
type Query {
  people: [peopleTypes]
}

people:

```

```js
//server.js
// npm init -y
// npm install graphql
// npm install express express-graphql morgan
'use strict';

const express = require('express');
const { buildSchema } = require('graphql');
const expressGraphql = require('express-graphql');
const router = express.Router();

const app = express();

const simpleSchema = buildSchema(`
  type Query{
    message: String
  }
`);

const simpleResolver = {
  message: () => 'Hey There!!',
}

const graph = expressGraphql({
  schema: simpleSchema,
  rootValue: simpleResolver,
  graphiql: true
})

router.use('/graphql', graph);

app.use(router);

app.listen(3000, () => console.log('App Up'));

```
