"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRestEndpoints = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _boom = require("boom");

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

var R = _interopRequireWildcard(require("ramda"));

var _appConfig = _interopRequireDefault(require("./config/appConfig"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isAuthenticated = (req, res, next) => req.get('Authorization') === _appConfig.default.internalAuthToken ? next() : res.status(401).send((0, _boom.unauthorized)());

const applyMiddlewares = app => {
  app.use((0, _compression.default)());
  app.use(_bodyParser.default.json({
    limit: '1mb'
  }));
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use((0, _cors.default)());
};

const registerRestEndpoints = app => {
  applyMiddlewares(app);
  app.get('/', (_, res) => res.json(R.pick(['name', 'version'], _appConfig.default)));
};

exports.registerRestEndpoints = registerRestEndpoints;
//# sourceMappingURL=rest-routes.js.map