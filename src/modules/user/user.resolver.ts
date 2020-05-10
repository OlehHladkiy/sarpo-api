import { Context } from '@types';

import UserController from './user.controller';

export const resolvers = {
  Query: {
    fetchMe: async (_: any, __: any, ctx: Context) =>
      await UserController.fetchMe(ctx),
  },
  Mutation: {
    updateUser: async (_: any, { data }: any) =>
      await UserController.updateUser(data),
    updateUserPassword: async (_: any, { data }: any) =>
      await UserController.updateUserPassword(data),
  },
};

export const middlewares = {};
