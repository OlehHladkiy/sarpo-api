import AuthController from './auth.controller';

export const resolvers = {
  Mutation: {
    signIn: async (_: any, { data }: any) => await AuthController.signIn(data),
    signUp: async (_: any, { data }: any) => await AuthController.signUp(data),
  },
};

export const middlewares = {};
