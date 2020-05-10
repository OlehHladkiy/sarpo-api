"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = void 0;

var _graphqlShield = require("graphql-shield");

var _rules = require("./rules");

const permissions = (0, _graphqlShield.shield)({
  Query: {
    fetchMe: _rules.isAuthenticatedUser
  },
  Mutation: {
    updateUser: _rules.isAuthenticatedUser,
    updateUserPassword: _rules.isAuthenticatedUser
  }
});
exports.permissions = permissions;
//# sourceMappingURL=index.js.map