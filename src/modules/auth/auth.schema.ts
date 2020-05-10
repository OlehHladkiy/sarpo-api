import gql from 'graphql-tag';

const Auth = gql`
  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    name: String!
    password: String!
  }

  type AuthResult {
    token: String!
    user: User!
  }

  extend type Query {
    isEmailTaken(email: String!): Boolean!
  }

  extend type Mutation {
    signIn(data: SignInInput!): AuthResult!
    signUp(data: SignUpInput!): AuthResult!
  }
`;

export default Auth;
