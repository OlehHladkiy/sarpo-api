import * as winston from 'winston';
import 'winston-mongodb';

import mongoConfig from '@config/mongoConfig';

export default class LoggerService {
  /**
   * Initialize Winston logger with MongoDB transport.
   */
  public static initializeLogger = () => {
    winston.clear();
    winston.add(
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.splat(),
        ),
      }),
    );
    winston.add(
      new (winston.transports as any).MongoDB({
        level: 'debug',
        db: mongoConfig.uri,
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      }),
    );
  };
}
