import { Set } from './BaseRoute';

const Rel = rel => (target, method, descriptor) => {
  Set(`${target.constructor.name}::${method}`, { rel });
  return descriptor;
};

export default Rel;
