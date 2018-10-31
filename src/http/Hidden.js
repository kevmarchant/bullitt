import { Set } from './BaseRoute';

const Hidden = (target, method, descriptor) => {

  Set(`${target.constructor.name}::${method}`, {
    hidden: true
  });
  return descriptor;
};

export default Hidden;
