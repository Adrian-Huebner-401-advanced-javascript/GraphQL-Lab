'use strict';

const Todos = require('./src/models/todo/todo-model');
const { buildSchema } = require('graphql');
const expressGraphql = require('express-graphql');
const todoModel = new Todos();

// our graphql API

// Step One: Define our schema this includes Queries and Data Types and eventually Resolvers
const todoSchema = buildSchema(`
  type Todo {
    id: ID!
    text: String!
    category: String
    assignee: String!
    difficulty: Int!
    complete: Boolean!
  }
  type Query {
    todo:(id: ID!) : Todo
    todos: [Todos]
  }
  type Mutation {
    createTodo(text: String!, category: String, assignee: String!, difficulty: Int, complete: Boolean): Todo
  }
`);

// Step Two: All of our Resolvers
const rootReducers = {
  todos: (args) => {
    todoModel.get()
      .then( data => {
        const output = {
          count: data.length,
          results: data,
        };
        return output;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  todo: (args) => {
    todoModel.get(args.id)
      .then( result => result[0] )
      .catch( (err) => {
        console.error(err);
      });
  },
  createTodo: (args) => {
    todoModel.create(args)
      .then( result => result )
      .catch( (err) => {
        console.log(err);
      });
  },
};

module.exports = expressGraphql({
  schema: todoSchema,
  rootValue: rootReducers,
  graphiql: true,
});