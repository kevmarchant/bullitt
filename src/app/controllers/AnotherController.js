import winston from 'winston-formatted';
import { Controller } from '../../web';
import { Get, Rel, Hidden } from '../../http';
import { RequiresPermissions } from '../../security';

const log = winston.loggerFor(module);

@Controller('/api')
class AnotherController {

  @Hidden
  @Get('/hidden')
  @RequiresPermissions('HIDDEN_ROUTE_PERMISSION')
  HiddenRoute({ res }) {
    log.info('logging from another controller');
    res.send('You cannot see me!');
  }

  @Get('/')
  @Rel('Kev')
  Index({ res }) {
    res.send('Hello world another');
  }
}

export default AnotherController;
