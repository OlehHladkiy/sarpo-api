"use strict";

var _graphqlTools = require("graphql-tools");

var _graphqlYoga = require("graphql-yoga");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _winston = require("winston");

var _serverConfig = _interopRequireDefault(require("./config/serverConfig"));

var _mongoConfig = _interopRequireDefault(require("./config/mongoConfig"));

var _appConfig = _interopRequireDefault(require("./config/appConfig"));

var _auth = _interopRequireDefault(require("./modules/auth/auth.controller"));

var _permissions = require("./modules/permissions");

var _logger = _interopRequireDefault(require("./services/logger"));

var _resolvers = require("./resolvers");

var _restRoutes = require("./rest-routes");

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const appName = _appConfig.default.name;
const port = _serverConfig.default.port;
const {
  ObjectId
} = _mongoose.default.Types;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

_logger.default.initializeLogger();

(async () => {
  await _mongoose.default.connect(_mongoConfig.default.uri, _mongoConfig.default.connectionOptions);
})();

const schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _schema.default,
  resolvers: _resolvers.resolvers
});
const middlewares = [_permissions.permissions, _resolvers.middlewares];
const server = new _graphqlYoga.GraphQLServer({
  schema,
  middlewares,
  context: async ctx => {
    let user = null;
    let organization = null;

    try {
      const encodedToken = ctx.request.get('Authorization');
      user = await _auth.default.getUserByAuthToken(encodedToken);
    } catch (err) {
      if (!user) {
        user = null;
      }

      if (!organization) {
        organization = null;
      }
    }

    return _objectSpread({}, ctx, {
      user
    });
  }
});
(0, _restRoutes.registerRestEndpoints)(server.express);
server.start(_serverConfig.default, () => (0, _winston.info)(`${appName} (GraphQL) running on ${port}`));
//# sourceMappingURL=index.js.map