"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const article_1 = require("./article");
const user_1 = require("./user");
const tab_1 = require("./tab");
const router = new Router();
router.use(article_1.default.routes()).use(article_1.default.allowedMethods());
router.use(user_1.default.routes()).use(user_1.default.allowedMethods());
router.use(tab_1.default.routes()).use(tab_1.default.allowedMethods());
exports.default = router;
//# sourceMappingURL=route.js.map