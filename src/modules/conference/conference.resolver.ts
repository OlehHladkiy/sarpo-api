import { Context } from '@types';

import ConferenceController from './conference.controller';

export const resolvers = {
  Query: {
    getConference: async (_: any, { data }: any, ctx: Context) =>
      await ConferenceController.getConference(ctx, data),
    getConferences: async (_: any, { data }: any, ctx: Context) =>
      await ConferenceController.getConferences(ctx, data),
  },
  Mutation: {
    createConference: async (_: any, { data }: any, ctx: Context) =>
      await ConferenceController.createConference(ctx, data),
    updateConference: async (_: any, { data }: any, ctx: Context) =>
      await ConferenceController.updateConference(ctx, data),
  },
};

export const middlewares = {};
