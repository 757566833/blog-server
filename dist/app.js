"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const jwtKoa = require("koa-jwt");
const serve = require("koa-static");
// import * as views from 'koa-views';
const cors = require("koa2-cors");
const mongoose = require("mongoose");
const path = require("path");
const token_1 = require("./config/token");
const route_1 = require("./routes/route");
console.log(token_1.secret);
mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true });
const app = new Koa();
app.use(bodyParser());
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
        }
    });
});
app.use(cors({
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(serve(path.resolve(__dirname, '..', 'public'), {
    maxage: 365 * 24 * 60 * 60 * 1000,
}));
// app.use(views(path.resolve(__dirname, '..', 'views'), {
//     extension: 'ejs',
// }));
app.use(jwtKoa({
    secret: token_1.secret,
}).unless({
    path: [/\/login/, /\/register/, /\/get\S{0,100}/],
    method: ['OPTIONS', 'GET'],
}));
console.log('11');
app.use(route_1.default.routes()).use(route_1.default.allowedMethods());
app.listen(10002);
//# sourceMappingURL=app.js.map