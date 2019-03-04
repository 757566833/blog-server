"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md5 = require("blueimp-md5");
const jwt = require("jsonwebtoken");
const Router = require("koa-router");
const util = require("util");
const salt_1 = require("../config/salt");
const login_1 = require("../controller/login");
const register_1 = require("../controller/register");
const verify = util.promisify(jwt.verify);
const token_1 = require("../config/token");
const router = new Router();
router.post('/login', async (ctx) => {
    // ctx.status = 500;
    const user = ctx.request.body;
    if (user && user.user && user.password) {
        user.password = md5(user.password + salt_1.default);
        const result = await login_1.Login.login(user);
        if (result) {
            const userToken = {
                name: user.user,
            };
            const token = `Bearer ${jwt.sign(userToken, token_1.secret, { expiresIn: '24h' })}`;
            ctx.body = {
                msg: '登录成功',
                code: 0,
                token,
                data: { isAdmin: result.isAdmin },
            };
        }
        else {
            ctx.body = {
                msg: '账号或密码错误',
                code: -1,
            };
        }
    }
    else {
        ctx.body = {
            msg: '参数错误',
            code: -2,
        };
    }
});
router.post('/register', async (ctx) => {
    // ctx.status = 500;
    const user = ctx.request.body;
    if (user.password && user.user) {
        user.password = md5(user.password + salt_1.default);
        const result = await register_1.Register.register(user);
        console.log('result', result);
        const userToken = {
            name: user.user,
        };
        const token = `Bearer ${jwt.sign(userToken, token_1.secret, { expiresIn: '24h' })}`;
        switch (result) {
            case 0:
                ctx.body = {
                    msg: '注册成功',
                    code: 0,
                    token,
                };
                break;
            case -1:
                ctx.body = {
                    msg: '用户名已存在',
                    code: -1,
                    token,
                };
                break;
            case -2:
                ctx.body = {
                    msg: '注册失败',
                    code: -2,
                    token,
                };
                break;
            default:
                break;
        }
    }
    else {
        ctx.body = {
            msg: '参数错误',
            data: '',
            code: -2,
        };
    }
});
router.get('/hello', async (ctx) => {
    const token = ctx.header.authorization; // 获取jwt
    let payload;
    console.log(token);
    if (token && token !== 'undefined') {
        payload = await verify(token, '123'); // 解密，获取payload
        ctx.body = {
            payload,
        };
    }
    else {
        ctx.body = {
            message: 'token 错误',
            code: -1,
        };
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map