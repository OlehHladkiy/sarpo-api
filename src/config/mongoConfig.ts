import * as R from 'ramda';

/**
 * Mongo config.
 *
 * @property {string} uri='mongodb://mongo:27017/api' - Mongo connection uri.
 */
const mongoConfig = {
  uri: R.defaultTo('mongodb://mongo:27017/sarpo-api', process.env.MONGO_URI),
  connectionOptions: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
};

export default mongoConfig;
