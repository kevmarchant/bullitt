import { Set } from '../http/BaseRoute';

const RequiresPermissions = (requiredPermissions = []) => (target, method, descriptor) => {

  if (!Array.isArray(requiredPermissions)) {
    if (typeof requiredPermissions === 'string') {
      requiredPermissions = [requiredPermissions];
    } else {
      throw new Error('RequiresPermissions expects either an array or string');
    }
  }

  Set(`${target.constructor.name}::${method}`, { requiredPermissions });
  return descriptor;
};

export default RequiresPermissions;
