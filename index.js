import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs  from './schema';
import resolvers  from './resolvers';
import models  from './models';
import { graphiqlConnect } from 'apollo-server-express/dist/connectApollo';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

const graphqlEndPoint = '/graphql';

// bodyParser is needed just for POST.
app.use(graphqlEndPoint, bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndPoint }));

models.sequelize.sync({ force: true }).then(() =>{
    app.listen(8080);
});
