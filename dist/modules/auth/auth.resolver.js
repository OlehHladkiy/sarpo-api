"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middlewares = exports.resolvers = void 0;

var _auth = _interopRequireDefault(require("./auth.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolvers = {
  Mutation: {
    signIn: async (_, {
      data
    }) => await _auth.default.signIn(data),
    signUp: async (_, {
      data
    }) => await _auth.default.signUp(data)
  }
};
exports.resolvers = resolvers;
const middlewares = {};
exports.middlewares = middlewares;
//# sourceMappingURL=auth.resolver.js.map