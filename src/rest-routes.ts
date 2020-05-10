import bodyParser from 'body-parser';
import { unauthorized } from 'boom';
import compression from 'compression';
import cors from 'cors';
import { Application, Handler } from 'express';
import * as R from 'ramda';

import appConfig from '@config/appConfig';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isAuthenticated: Handler = (req, res, next) =>
  req.get('Authorization') === appConfig.internalAuthToken
    ? next()
    : res.status(401).send(unauthorized());

const applyMiddlewares = (app: Application) => {
  app.use(compression());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
};

export const registerRestEndpoints = (app: Application) => {
  applyMiddlewares(app);

  app.get('/', (_, res) => res.json(R.pick(['name', 'version'], appConfig)));
};
