import Router from '@koa/router';
import authRoute from './authRoute';
import fileRoute from './fileRoute';
import docRoute from './docRoute';
import userRoute from './userRoute';

const router = new Router();

// 健康检查
router.get('/health', (ctx) => {
  ctx.body = {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
});

// 注册各模块路由
router.use(authRoute.routes(), authRoute.allowedMethods());
router.use(fileRoute.routes(), fileRoute.allowedMethods());
router.use(docRoute.routes(), docRoute.allowedMethods());
router.use(userRoute.routes(), userRoute.allowedMethods());

export default router;

