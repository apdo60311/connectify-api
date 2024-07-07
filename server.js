"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var db_1 = require("./config/db");
var auth_routes_1 = require("./routes/auth.routes");
var post_routes_1 = require("./routes/post.routes");
var comment_routes_1 = require("./routes/comment.routes");
var friendrequest_routes_1 = require("./routes/friendrequest.routes");
var profile_routes_1 = require("./routes/profile.routes");
var notification_routes_1 = require("./routes/notification.routes");
var user_routes_1 = require("./routes/user.routes");
var reaction_routes_1 = require("./routes/reaction.routes");
var message_routes_1 = require("./routes/message.routes");
var feed_routes_1 = require("./routes/feed.routes");
var report_routes_1 = require("./routes/report.routes");
var privacy_routes_1 = require("./routes/privacy.routes");
var logging_middleware_1 = require("./middlewares/logging.middleware");
var ratelimiter_middleware_1 = require("./middlewares/ratelimiter.middleware");
var error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
(0, db_1.default)().then(function (connection) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); });
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logging_middleware_1.loggerMiddleware);
app.use(error_middleware_1.default);
app.use('/api/', ratelimiter_middleware_1.rateLimiterMiddleware);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/posts', post_routes_1.default);
app.use('/api/comments', comment_routes_1.default);
app.use('/api/profile', profile_routes_1.default);
app.use('/api/friend-request', friendrequest_routes_1.default);
app.use('/api/notifications', notification_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/reactions', reaction_routes_1.default);
app.use('/api/messages', message_routes_1.default);
app.use('/api/feed', feed_routes_1.default);
app.use('/api/reports', report_routes_1.default);
app.use('/api/privacy', privacy_routes_1.default);
var PORT = process.env.PORT || 5000;
var url = "http://localhost:".concat(PORT);
app.listen(PORT, function () { console.log("Server running on port ".concat(PORT)); console.log("follow this url ".concat(url)); });
