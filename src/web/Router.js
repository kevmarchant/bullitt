/* eslint no-eval: 0 */
import express from 'express';
import bodyParser from 'body-parser';
import url from 'url-join';
import winston from 'winston-formatted';
import { SecurityProvider } from '../security';
import { EntryPointController } from '.';

let singleton = null;
const log = winston.loggerFor(module);

class Router {

  constructor() {
    if (!singleton) singleton = this;
    this.routes = {};
    return singleton;
  }

  init(controllers) {
    log.debug('Initialising Router');

    const router = express.Router();
    router.use(bodyParser.urlencoded({ extended: false }));
    // const definitions = {};

    log.debug('Initialising routes');

    const links = Object.keys(this.routes)
      .map(key => ({ key, ...this.routes[key] }))
      .filter(({ target }) => target !== 'EntryPointController')
      .map(({
        type, target, method, path, rel, handler, requiredRoles, requiredPermissions, hidden
      }) => {
        const Controller = eval(controllers[target]);
        const controller = new Controller({
          config: {
            PORT: 3000
          }
        });

        const handlers = [handler.bind(controller)];
        const href = url(controller.basePath, path);
        const $ref = null;

        if (requiredPermissions.length || requiredRoles.length) {
          const securityProvider = new SecurityProvider(requiredPermissions, requiredRoles);
          handlers.unshift(securityProvider.CheckPermissions.bind(securityProvider));
        }

        if (href === '/') {
          log.warn(`Controller '${target}' method '${method}' targets the root path '/', which will override the inbuilt HATEAOS controller`);
        }
        //   if (validation) {
        //     definitions[rel] = {};
        //     $ref = `#definitions/${rel}`;
        //     // handlers.unshift(validate(validation));
        //   }

        if (!rel) rel = `${target.replace('Controller', '')}::${method}`;
        log.verbose(`Route found: [${rel}] ${type}: ${href}`);
        router.route(href.replace(/\{/g, ':').replace(/\}/g, ''))[type.toLowerCase()](...handlers);
        return {
          rel, href, type, hidden, $ref
        };
      })
      .filter(({ hidden }) => !hidden);

    log.debug('Initialising entry point controller');
    const entryPointController = new EntryPointController({ links });
    router.route('/').get(this.routes['EntryPointController::Index'].handler.bind(entryPointController));
    log.debug('Router initialised');
    return router;
  }
}

export default Router;
