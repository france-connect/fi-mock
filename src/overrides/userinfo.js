import { getErrorCode, logger, wait } from '../helpers';

const userinfoMap = async (errorCode, ctx) => {
  logger.log('userinfoMap', { errorCode });
  switch (errorCode) {
    case 'E020005':
      delete ctx.body.sub;
      break;

    case 'E020007':
      ctx.res.send('<html><head><body>OK</body></head></html>');
      break;

    case 'E020008':
      ctx.res.status(401);
      break;

    case 'E020009':
      ctx.res.status(500);
      break;

    case 'E020010':
      ctx.res.status(502);
      break;

    case 'E020011':
      ctx.res.status(503);
      break;

    case 'E020018':
      await wait(25000);
      break;

    // no default
  }
};


const overrideOIDCUserinfo = async (ctx) => {
  if (ctx.req.url === '/api/user?schema=openid') {
    const errorCode = getErrorCode(ctx.body.given_name);
    await userinfoMap(errorCode, ctx);
  }

  return ctx.body;
};

export default overrideOIDCUserinfo;
