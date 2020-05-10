import * as R from 'ramda';

/**
 * App config.
 *
 * @property {string} name - App name.
 * @property {string} version - App version.
 */
const appConfig = {
  name: 'sarpo-api',
  version: '0.1.0',
  url: R.defaultTo('http://sarpo-api:4001', process.env.SARPO_API_URL),
  internalAuthToken: '7afc7f6f-0298-422f-bf4f-00c9cc0ef8cb',
};

export default appConfig;
