import { shield } from 'graphql-shield';

import { isAuthenticatedUser } from './rules';

export const permissions = shield({
  Query: {
    fetchMe: isAuthenticatedUser,
    getConferences: isAuthenticatedUser,
  },
  Mutation: {
    updateUser: isAuthenticatedUser,
    updateUserPassword: isAuthenticatedUser,
    createConference: isAuthenticatedUser,
  },
});
