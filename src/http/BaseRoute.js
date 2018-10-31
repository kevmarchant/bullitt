import Router from '../web/Router';

const router = new Router();
const routeTemplate = {
  type: 'Unknown',
  target: 'Unknown',
  method: 'Unknown',
  path: '/',
  rel: null,
  handler: null,
  hidden: false,
  requiredPermissions: [],
  requiredRoles: []
};

export const Set = (key, options = {}) => {
  if (!router.routes[key]) router.routes[key] = routeTemplate;
  router.routes[key] = { ...router.routes[key], ...options };
};
