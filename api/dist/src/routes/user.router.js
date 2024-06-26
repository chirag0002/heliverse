"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
exports.app = (0, express_1.Router)();
exports.app.get('/', user_controller_1.getAllUsers);
exports.app.get('/:id', user_controller_1.getUser);
exports.app.post('/', user_controller_1.addUser);
exports.app.put('/:id', user_controller_1.updateUser);
exports.app.delete('/:id', user_controller_1.deleteUser);
exports.app.post('/auth', user_controller_1.userAuth);
