import GraphQLJSON from 'graphql-type-json';
import * as R from 'ramda';

import {
  middlewares as authMiddlewares,
  resolvers as authResolvers,
} from '@modules/auth/auth.resolver';
import {
  middlewares as userMiddlewares,
  resolvers as userResolvers,
} from '@modules/user/user.resolver';
import {
  middlewares as conferenceMiddlewares,
  resolvers as conferenceResolvers,
} from '@modules/conference/conference.resolver';

export const resolvers = R.reduce(R.mergeDeepRight, {}, [
  { JSON: GraphQLJSON },
  authResolvers,
  userResolvers,
  conferenceResolvers,
]);

export const middlewares: any = R.reduce(R.mergeDeepRight, {}, [
  authMiddlewares,
  userMiddlewares,
  conferenceMiddlewares,
]);
