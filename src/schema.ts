import AuthSchema from '@modules/auth/auth.schema';
import UserSchema from '@modules/user/user.schema';

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

const typeDefs = [baseType, AuthSchema, UserSchema];

export default typeDefs;
