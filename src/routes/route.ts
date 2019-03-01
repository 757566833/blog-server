import * as Router from 'koa-router';
import articleRouter from './article';
import userRouter from './user';
import tabsRouter from './tab';

const router = new Router();
router.use(articleRouter.routes()).use(articleRouter.allowedMethods());
router.use(userRouter.routes()).use(userRouter.allowedMethods());
router.use(tabsRouter.routes()).use(tabsRouter.allowedMethods());
export default router;
