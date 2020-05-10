"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Auth = (0, _graphqlTag.default)`
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
var _default = Auth;
exports.default = _default;
//# sourceMappingURL=auth.schema.js.map