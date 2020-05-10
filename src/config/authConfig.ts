import * as R from 'ramda';

/**
 * Authentication config.
 *
 * @property {string} jwtSecret='changeme' - JWT secret.
 */
const authConfig = {
  jwtSecret: R.defaultTo('changeme', process.env.JWT_SECRET),
};

export default authConfig;
