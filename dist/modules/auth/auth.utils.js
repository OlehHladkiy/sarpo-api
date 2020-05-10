"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testPasswordStrength = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _owaspPasswordStrengthTest = _interopRequireDefault(require("owasp-password-strength-test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @flow
_owaspPasswordStrengthTest.default.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 10,
  minPhraseLength: 20,
  minOptionalTestsToPass: 4
});
/**
 * Validate strong user password.
 * @param {string} password - user password.
 * @returns {Object} owasp object.
 */


const testPasswordStrength = password => {
  const result = _owaspPasswordStrengthTest.default.test(password);

  const nextError = R.compose(R.head, R.propOr([], 'errors'))(result);
  return {
    error: nextError,
    strong: R.prop('strong', result),
    isPassphrase: R.prop('isPassphrase', result)
  };
};

exports.testPasswordStrength = testPasswordStrength;
//# sourceMappingURL=auth.utils.js.map