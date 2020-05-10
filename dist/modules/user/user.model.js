"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.UserSchema = void 0;

var mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: null,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  name: {
    type: String,
    default: null,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  address: {
    line1: {
      type: String,
      default: null
    },
    line2: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    }
  },
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    default: null
  }]
});
exports.UserSchema = UserSchema;
UserSchema.plugin(_mongooseTimestamp.default);
const User = mongoose.model('User', UserSchema, 'User');
exports.User = User;
//# sourceMappingURL=user.model.js.map