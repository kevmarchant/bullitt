const Controller = (basePath = '/') => target => class extends target {
  constructor(...args) {
    super(...args);
    return Object.assign({}, target, ...args, { basePath });
  }
};

export default Controller;
