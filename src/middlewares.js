import { getErrorCode } from './helpers';


export function storeParamsInSession(req, res, next) {
  if (!req.session.infos) {
    req.session.infos = {};
  }

  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      req.session.infos[key] = req.query[key];
    });
  }

  next();
}

export function saveErrorCodeToSession(req, res, next) {
  const loginPattern = new RegExp('^/interaction/[a-z0-9-]+/login$');

  if (loginPattern.test(req.url)) {
    req.session.errorCode = getErrorCode(req.body.login);
  }

  next();
}
