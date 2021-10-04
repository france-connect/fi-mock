import server from 'fi-example';
import { urlencoded } from 'express';
import session from 'express-session';

import { storeParamsInSession, saveErrorCodeToSession } from './middlewares';
import { overrideOIDCRedirect, overrideOIDCUserinfo } from './overrides';

server.use('/interaction', urlencoded({ extended: false }));
server.use(session({ secret: 'ZeiGae8ovee' }));

// Store informations in session to have an easy access
// since things are encrypted and hard to retrieve from a token
// keep in mind that this is a mock, not a production app...
server.use(storeParamsInSession);
server.use(saveErrorCodeToSession);

// Register our custom overrides
// see https://github.com/panva/node-oidc-provider/tree/master/docs#pre--and-post-middlewares
server.provider.use(async (ctx, next) => {
  ctx.redirect = overrideOIDCRedirect(ctx);

  await next();

  ctx.body = await overrideOIDCUserinfo(ctx);
});


server.start();
