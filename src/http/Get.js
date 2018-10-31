import { Set } from './BaseRoute';

const Get = path => (target, method, descriptor) => {

  Set(`${target.constructor.name}::${method}`, {
    type: 'GET',
    target: target.constructor.name,
    method,
    path,
    handler: descriptor.value
  });
  return descriptor;
};

export default Get;
