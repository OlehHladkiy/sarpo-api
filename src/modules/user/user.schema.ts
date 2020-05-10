import gql from 'graphql-tag';

const User = gql`
  type UserAddress {
    line1: String
    line2: String
    city: String
    country: String
  }

  type User {
    _id: String!
    email: String!
    name: String
    avatar: String
    phone: String
    address: UserAddress
    tickets: [String!]
    createdAt: Date!
    updatedAt: Date!
    isOnboarded: Boolean
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

export default () => [User];
