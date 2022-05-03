import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../apollo/schema';
import dbConnect from '../../lib/dbConnect';

dbConnect();

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    return ctx;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
