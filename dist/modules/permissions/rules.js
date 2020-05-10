"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticatedUser = void 0;

var _graphqlShield = require("graphql-shield");

const isAuthenticatedUser = (0, _graphqlShield.rule)({
  cache: 'contextual'
})((parent, args, ctx) => Boolean(ctx.user) && !Boolean(ctx.user.deletedAt));
exports.isAuthenticatedUser = isAuthenticatedUser;
//# sourceMappingURL=rules.js.map