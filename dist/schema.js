"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.baseType = void 0;

var _auth = _interopRequireDefault(require("./modules/auth/auth.schema"));

var _user = _interopRequireDefault(require("./modules/user/user.schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseType = `
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
exports.baseType = baseType;
const typeDefs = [baseType, _auth.default, _user.default];
var _default = typeDefs;
exports.default = _default;
//# sourceMappingURL=schema.js.map