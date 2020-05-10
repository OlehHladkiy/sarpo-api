import * as R from 'ramda';

/**
 * Server config.
 *
 * @property {number} port=4001 - Server port.
 */
const serverConfig: any = {
  playground: false,
  port: R.defaultTo(4001, process.env.PORT),
  apolloEngine: {
    apiKey: R.defaultTo(null, process.env.APOLLO_ENGINE_API_KEY),
  },
  clientUrl: R.defaultTo(null, process.env.CLIENT_URL),
};

export default serverConfig;
