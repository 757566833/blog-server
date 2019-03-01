import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as jwtKoa from 'koa-jwt';
import * as serve from 'koa-static';
import * as views from 'koa-views';
import * as cors from 'koa2-cors';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { secret } from './config/token';
import router from './routes/route';
console.log(secret);
mongoose.connect('mongodb://127.0.0.1:27017/blog', {useNewUrlParser: true});

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
    secret,
}).unless({
    path: [/\/login/, /\/register/, /\/get\S{0,100}/],
    method: ['OPTIONS', 'GET'],
}));
console.log('11');
app.use(router.routes()).use(router.allowedMethods());
app.listen(10002);
