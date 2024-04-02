"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = require("express");
const user_router_1 = require("./user.router");
const team_router_1 = require("./team.router");
exports.app = (0, express_1.Router)();
exports.app.use('/users', user_router_1.app);
exports.app.use('/team', team_router_1.app);
