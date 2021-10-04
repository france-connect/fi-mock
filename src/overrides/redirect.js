import queryString from 'query-string';
import { logger } from '../helpers';

const redirectMap = (errorCode, redirectWithChanges) => {
  logger.log('redirectMap', { errorCode });
  switch (errorCode) {
    case 'E020012':
      return redirectWithChanges({ acr_values: 3 });

    case 'E020021':
      return redirectWithChanges({ code: null });

    case 'E020022':
      return redirectWithChanges({ state: 'random_state' });

    default:
      return redirectWithChanges({});
  }
};

// Build a helper function that needs to have several datas in its scope
const getRedirectHelper = (ctx, redirectURL) => (changes) => {
  const { url, query } = queryString.parseUrl(redirectURL);
  const newQuery = Object.assign(query, changes);
  const newUrl = `${url}?${queryString.stringify(newQuery)}`;

  return ctx.res.redirect(newUrl);
};

const overrideOIDCRedirect = ctx => redirectURL => redirectMap(
  ctx.req.session.errorCode,
  getRedirectHelper(ctx, redirectURL),
);

export default overrideOIDCRedirect;
