import { Set } from '../http/BaseRoute';

const RequiresRoles = (requiredRoles = []) => (target, method, descriptor) => {

  if (!Array.isArray(requiredRoles)) {
    if (typeof requiredRoles === 'string') {
      requiredRoles = [requiredRoles];
    } else {
      throw new Error('RequiresRoles expects either an array or string');
    }
  }

  Set(`${target.constructor.name}::${method}`, { requiredRoles });
  return descriptor;
};

export default RequiresRoles;
