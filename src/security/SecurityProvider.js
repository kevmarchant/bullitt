import winston from 'winston-formatted';
import { sign, verify } from 'jsonwebtoken';

const log = winston.loggerFor(module);

class SecurityProvider {

  constructor(requiredPermissions = [], requiredRoles = []) {
    log.debug('SecurityProvider initialising');
    this.requiredPermissions = requiredPermissions;
    this.requiredRoles = requiredRoles;
  }

  CheckPermissions(req, res, next) {
    log.debug('Checking permissions for secured route');
    console.log({
      perms: this.requiredPermissions,
      roles: this.requiredRoles
    });
    next();
  }

  CreateToken(payload, expiresIn = '1h') {
    return sign(payload, 'sssssshhhhhh', { expiresIn });
  }

  VerifyToken(token) {
    try {
      return verify(token, 'sssssshhhhhh');
    } catch (err) {
      return false;
    }
  }
}

export default SecurityProvider;
