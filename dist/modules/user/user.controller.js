"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _boom = require("boom");

var _bcryptjs = require("bcryptjs");

var _auth = require("../auth/auth.utils");

var _user = require("./user.model");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UserController {}

exports.default = UserController;

_defineProperty(UserController, "fetchMe", async ctx => ctx.user);

_defineProperty(UserController, "updateUser", async (_ref) => {
  let {
    _id
  } = _ref,
      dataToUpdate = _objectWithoutProperties(_ref, ["_id"]);

  const user = await _user.User.findByIdAndUpdate(_id, {
    $set: dataToUpdate
  }, {
    new: true
  });
  return user;
});

_defineProperty(UserController, "updateUserPassword", async ({
  email,
  currentPassword,
  newPassword
}) => {
  const user = await _user.User.findOne({
    email
  });
  const newPasswordHashed = await (0, _bcryptjs.hash)(newPassword, 10);
  const {
    error
  } = (0, _auth.testPasswordStrength)(newPassword);
  let isPasswordRight = null;

  try {
    if (user) {
      isPasswordRight = await (0, _bcryptjs.compare)(currentPassword, user.password);
    }
  } catch {
    isPasswordRight = false;
  }

  if (error) {
    throw new Error(error);
  }

  if (!user || !isPasswordRight) {
    return (0, _boom.unauthorized)('Your current password is incorrect');
  }

  await _user.User.findByIdAndUpdate(user.id, {
    $set: {
      password: newPasswordHashed
    }
  }, {
    new: true
  });
  return {
    user
  };
});
//# sourceMappingURL=user.controller.js.map