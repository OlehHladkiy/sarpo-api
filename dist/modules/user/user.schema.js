"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = (0, _graphqlTag.default)`
  type UserAddress {
    line1: String
    line2: String
    city: String
    country: String
  }

  type User {
    email: String!
    name: String
    avatar: String
    phone: String
    address: UserAddress
    events: [String!]
    createdAt: Date!
    updatedAt: Date!
  }

  input UserAddressInput {
    line1: String!
    line2: String!
    city: String!
    country: String!
  }

  input UpdateUserInput {
    _id: String!
    email: String!
    name: String
    avatar: String
    phone: String
    address: UserAddressInput
  }

  input UpdateUserPasswordInput {
    email: String!
    currentPassword: String!
    newPassword: String!
  }

  type UpdateUserPasswordResult {
    user: User!
  }

  input UploadAvatarInput {
    file: Upload!
  }

  extend type Query {
    fetchMe: User!
  }

  extend type Mutation {
    updateUser(data: UpdateUserInput!): User!
    updateUserPassword(
      data: UpdateUserPasswordInput!
    ): UpdateUserPasswordResult!
  }
`;

var _default = () => [User];

exports.default = _default;
//# sourceMappingURL=user.schema.js.map