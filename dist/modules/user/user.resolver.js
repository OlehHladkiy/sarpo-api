"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middlewares = exports.resolvers = void 0;

var _user = _interopRequireDefault(require("./user.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolvers = {
  Query: {
    fetchMe: async (_, __, ctx) => await _user.default.fetchMe(ctx)
  },
  Mutation: {
    updateUser: async (_, {
      data
    }) => await _user.default.updateUser(data),
    updateUserPassword: async (_, {
      data
    }) => await _user.default.updateUserPassword(data)
  }
};
exports.resolvers = resolvers;
const middlewares = {};
exports.middlewares = middlewares;
//# sourceMappingURL=user.resolver.js.map