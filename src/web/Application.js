import express from 'express';
import winston from 'winston-formatted';
import { Router } from '.';

const log = winston.loggerFor(module);

let singleton = null;

class Application {

  constructor() {
    process.stdout.write('\x1b[2J\x1b[0f');
    log.info('Starting Bullitt application');
    if (!singleton) singleton = this;
    this.app = express();
    this.router = new Router();
    return singleton;
  }

  start(controllers) {
    this.app.use(this.router.init(controllers));
    this.app.listen(3000, () => log.info('Server listening on port 3000'));
  }
}

export default Application;
