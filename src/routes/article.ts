
import * as Router from 'koa-router';

import { Iarticle, IarticleList } from '../interfaces/article';
import { Article } from '../controller/article';

import * as util from 'util';
import * as jwt from 'jsonwebtoken';
const verify = util.promisify(jwt.verify);

const router = new Router();

router.get('/article', async (ctx) => {
    const article: Iarticle = ctx.request.query;
    const result = await Article.getArticle(article);
    ctx.body = {
        msg: '查找成功',
        data: result,
        code: 0,
    };
});

router.post('/article', async (ctx) => {
    const article: Iarticle = ctx.request.body;
    let token: string = ctx.header.authorization;  // 获取jwt
    token = token.substr(7);
    const payload: any = await verify(token, 'calculator jwt'); // 解密，获取payload
    article.author = payload.name;
    Article.addArticle(article);
    ctx.body = {
        msg: '添加成功',
        code: 0,
    };
});
// router.delete('/article', async (ctx) => {
//     const machine: any = ctx.request.body;
//     DeleteMachine.deleteMachine(machine);
//     ctx.body = {
//         msg: '删除成功',
//         code: 0,
//     };
// });
router.put('/article', async (ctx) => {
    const body: { json: Iarticle, _id: string } = ctx.request.body;
    let token: string = ctx.header.authorization;  // 获取jwt
    token = token.substr(7);
    const payload: any = await verify(token, 'calculator jwt'); // 解密，获取payload
    const author = payload.name;
    const result: Iarticle = await Article.updateArticle(body._id, body.json, author);
    if (result._id) {
        ctx.body = {
            msg: '修改成功',
            data: result,
            code: 0,
        };
    } else {
        ctx.body = {
            msg: '修改失败，没有权限',
            data: '',
            code: 0,
        };
    }

});

// router.get('/articleCount', async (ctx) => {
//     const result = await FindMachineCount.findMachineCount();
//     ctx.body = {
//         msg: '查找成功',
//         data: result,
//         code: 0,
//     };
// });

router.get('/articleList', async (ctx) => {
    const article: IarticleList = ctx.request.query;
    const result = await Article.ArticleList(article);
    ctx.body = {
        msg: '查找成功',
        data: result,
        code: 0,
    };
});

export default router;
