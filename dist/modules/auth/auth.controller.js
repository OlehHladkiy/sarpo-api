"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _boom = require("boom");

var _jsonwebtoken = require("jsonwebtoken");

var _user = require("../user/user.model");

var _authConfig = _interopRequireDefault(require("../../config/authConfig"));

var _auth = require("./auth.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AuthController {}

exports.default = AuthController;

_defineProperty(AuthController, "generateAuthToken", user => (0, _jsonwebtoken.sign)(user, _authConfig.default.jwtSecret));

_defineProperty(AuthController, "signUp", async ({
  email,
  name,
  password
}) => {
  const userByEmail = await _user.User.find({
    email
  });
  const {
    error
  } = (0, _auth.testPasswordStrength)(password);

  if (error) {
    throw new Error(error);
  }

  if (userByEmail.length > 0) {
    return (0, _boom.unauthorized)(`Email address ${email} already registered`);
  }

  const hashedPassword = await (0, _bcryptjs.hash)(password, 10);
  const user = await _user.User.create({
    email,
    password: hashedPassword,
    name
  });
  const token = AuthController.generateAuthToken({
    id: user.id
  });
  return {
    token,
    user: user ? user : null
  };
});

_defineProperty(AuthController, "signIn", async ({
  email,
  password
}) => {
  const user = await _user.User.findOne({
    email
  });
  let isAuthenticated = false; // Verify password

  try {
    if (user) {
      isAuthenticated = await (0, _bcryptjs.compare)(password, user.password);
    }
  } catch (e) {
    isAuthenticated = false;
  }

  if (!user || !isAuthenticated) {
    return (0, _boom.unauthorized)('Email or password is invalid');
  }

  if (user && user.deletedAt) {
    return (0, _boom.unauthorized)('Account has been deleted.');
  }

  if (!user.profile) {
    user.profile = {};
  }

  const token = AuthController.generateAuthToken({
    id: user.id
  });
  return {
    token,
    user
  };
});

_defineProperty(AuthController, "decodeAuthToken", encodedToken => {
  if (encodedToken) {
    const token = encodedToken.replace('Bearer ', '');
    const verifiedToken = (0, _jsonwebtoken.verify)(token, _authConfig.default.jwtSecret);
    return verifiedToken;
  }
});

_defineProperty(AuthController, "getUserByAuthToken", async encodedToken => {
  const token = AuthController.decodeAuthToken(encodedToken);

  if (token) {
    return await _user.User.findById(token.id);
  }

  return null;
});
//# sourceMappingURL=auth.controller.js.map