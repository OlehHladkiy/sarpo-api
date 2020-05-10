import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLServer } from 'graphql-yoga';
import mongoose from 'mongoose';
import { info } from 'winston';

import serverConfig from '@config/serverConfig';
import mongoConfig from '@config/mongoConfig';
import appConfig from '@config/appConfig';
import AuthController from '@modules/auth/auth.controller';
import { permissions } from '@modules/permissions';
import LoggerService from '@services/logger';
import { Context } from '@types';
import { middlewares as apiMiddlewares, resolvers } from './resolvers';
import { registerRestEndpoints } from './rest-routes';
import typeDefs from './schema';

const appName = appConfig.name;
const port = serverConfig.port;
const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function() {
  return this.toString();
};

LoggerService.initializeLogger();

(async () => {
  await mongoose.connect(mongoConfig.uri, mongoConfig.connectionOptions);
})();

const schema: any = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const middlewares = [permissions, apiMiddlewares];

const server = new GraphQLServer({
  schema,
  middlewares,
  context: async (ctx: Context) => {
    let user = null;
    let organization = null;

    try {
      const encodedToken = ctx.request.get('Authorization');
      user = await AuthController.getUserByAuthToken(encodedToken);
    } catch (err) {
      if (!user) {
        user = null;
      }
      if (!organization) {
        organization = null;
      }
    }

    return { ...ctx, user };
  },
});

registerRestEndpoints(server.express);

server.start(serverConfig, () =>
  info(`${appName} (GraphQL) running on ${port}`),
);
