import pino from 'pino';
import { dev } from '$app/environment';

let options: pino.LoggerOptions = {};

if (dev) {
  options = {
    level: 'trace',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  };
}

export const logger = pino(options);
export default logger;
