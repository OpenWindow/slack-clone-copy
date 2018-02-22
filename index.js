import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models  from './models';
import { graphiqlConnect } from 'apollo-server-express/dist/connectApollo';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

const graphqlEndPoint = '/graphql';

// bodyParser is needed just for POST.
app.use(
  graphqlEndPoint, 
  bodyParser.json(), 
  graphqlExpress(
    { 
      schema, 
      context: { 
        models,
        user: {
          id: 1
        } 
      }
    }));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndPoint }));

models.sequelize.sync({ }).then(() =>{
    app.listen(8080);
});
