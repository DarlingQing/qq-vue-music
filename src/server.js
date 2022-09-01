var express = require('express');
var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
var graphql = require('graphql');

var fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};

var streetBase = {
  0: {
    street: 'changhe',
    number: 0,
  },
  1: {
    street: 'changhe1',
    number: 1,
  }
}
// User类型
var userType = new graphql.GraphQLObjectType({
  name: 'user',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  },
});

// address类型
var addressType = new graphql.GraphQLObjectType({
  name: 'address',
  fields: {
    street: { type: graphql.GraphQLString },
    number: { type: graphql.GraphQLInt },
  },
  formatted: {
    type: graphql.GraphQLString,
    resolve(obj) {
      return obj.number + ' ' + obj.street
    }
  }
});

var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: (_, {id}) => {
        return fakeDatabase[id];
      },
    },
    address: {
      type: addressType,
      args: {
        street: { type: graphql.GraphQLString },
        number: { type: graphql.GraphQLInt },
      },
      formatted: { type: graphql.GraphQLString },
      resolve: (_, {number, street}) => {
        return streetBase[number]
      }
    },
  }
})

var schema = new graphql.GraphQLSchema({query: queryType})

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
