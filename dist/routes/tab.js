"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const tab_1 = require("../controller/tab");
const util = require("util");
const jwt = require("jsonwebtoken");
const verify = util.promisify(jwt.verify);
const router = new Router();
router.get('/tabs', async (ctx) => {
    const result = await tab_1.Tab.tabs();
    ctx.body = {
        msg: '查找成功',
        data: result,
        code: 0,
    };
});
router.post('/tab', async (ctx) => {
    const tab = ctx.request.body;
    let token = ctx.header.authorization; // 获取jwt
    token = token.substr(7);
    const payload = await verify(token, 'calculator jwt'); // 解密，获取payload
    const result = await tab_1.Tab.addTab(tab, payload.name);
    if (result) {
        ctx.body = {
            msg: '添加成功',
            code: 0,
        };
    }
    else {
        ctx.body = {
            msg: '添加失败',
            code: 0,
        };
    }
});
router.delete('/tab', async (ctx) => {
    const tab = ctx.request.body;
    const result = await tab_1.Tab.deleteTab(tab);
    if (result) {
        ctx.body = {
            msg: '删除成功',
            code: 0,
        };
    }
    else {
        ctx.body = {
            msg: '删除失败',
            code: 0,
        };
    }
});
router.get('/**', async (ctx) => {
    console.log(ctx.request.url);
    ctx.body = {
        msg: '删除成功',
        data: ctx.request.url,
        code: 0,
    };
});
// router.put('/article', async (ctx) => {
//     const machine: any = ctx.request.body;
//     const result = await UpdateMachine.updateMachine(machine.oldMachine, machine.newMachine);
//     ctx.body = {
//         msg: '修改成功',
//         data: result,
//         code: 0,
//     };
// });
// router.get('/articleCount', async (ctx) => {
//     const result = await FindMachineCount.findMachineCount();
//     ctx.body = {
//         msg: '查找成功',
//         data: result,
//         code: 0,
//     };
// });
// router.get('/articleList', async (ctx) => {
//     const article: IarticleList = ctx.request.query;
//     const result = await Article.ArticleList(article);
//     ctx.body = {
//         msg: '查找成功',
//         data: result,
//         code: 0,
//     };
// });
exports.default = router;
//# sourceMappingURL=tab.js.map