import client from '../libs/graphql';
// import gql from 'graphql-tag'
import * as searchGql from './search.graphql';
import * as testGql from './test.graphql';

/** searchGql模块 **/
export const search = (params) => client.query({ query: searchGql.search, variables: params });

// test
export const test = (params) => client.query({ query: testGql.test, variables: params });
