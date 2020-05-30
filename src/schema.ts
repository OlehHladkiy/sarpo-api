import AuthSchema from '@modules/auth/auth.schema';
import UserSchema from '@modules/user/user.schema';
import ConferenceSchema from '@modules/conference/conference.schema';

export const baseType = `
  scalar Date
  scalar JSON
  scalar Upload

  type Query {
    base: Boolean
  }

  type Mutation {
    base: Boolean
  }

  type Subscription {
    base: Boolean
  }
`;

const typeDefs = [baseType, AuthSchema, UserSchema, ConferenceSchema];

export default typeDefs;
