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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.userAuth = exports.addUser = exports.getUser = exports.getAllUsers = void 0;
const db_1 = require("../db/db");
const jsonwebtoken_1 = require("jsonwebtoken");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = '1', pageSize = '20' } = req.query;
    const { available, domain, gender, search } = req.query;
    const query = {};
    if (available !== undefined) {
        if (available === 'true')
            query.available = true;
        if (available === 'false')
            query.available = false;
    }
    if (domain !== undefined)
        query.domain = domain;
    if (gender !== undefined)
        query.gender = gender;
    if (search !== undefined) {
        query.$or = [
            { first_name: { $regex: search, $options: 'i' } },
            { last_name: { $regex: search, $options: 'i' } }
        ];
    }
    try {
        const users = yield db_1.User.find(query)
            .limit(Number(pageSize))
            .skip((Number(page) - 1) * Number(pageSize));
        const count = yield db_1.User.countDocuments({});
        res.status(200).json({
            users: users,
            count: count
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.User.findOne({ id: req.params.id });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json({
            user: user
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getUser = getUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
    try {
        const count = yield db_1.User.countDocuments({});
        const user = new db_1.User({
            id: count + 1,
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            avatar: avatar,
            domain: domain,
            available: available
        });
        yield user.save();
        const token = (0, jsonwebtoken_1.sign)({ email: user.email }, process.env.SECRET_KEY);
        res.status(200).json({
            message: "User saved successfully",
            token: token,
            userId: user.id
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.addUser = addUser;
const userAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield db_1.User.findOne({ email: email });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const token = (0, jsonwebtoken_1.sign)({ email: user.email }, process.env.SECRET_KEY);
        res.status(200).json({
            message: "User signedIn successfully",
            token: token,
            userId: user.id
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.userAuth = userAuth;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
    try {
        let user = yield db_1.User.findOne({ id: req.params.id });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.email = email || user.email;
        user.gender = gender || user.gender;
        user.avatar = avatar || user.avatar;
        user.domain = domain || user.domain;
        user.available = available || user.available;
        yield user.save();
        res.status(200).json({
            message: "User updated successfully"
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.User.findOne({ id: req.params.id });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const teams = yield db_1.Team.find({ "admin.email": req.user.email });
        if (!teams.length || user.email === req.user.email) {
            yield db_1.User.deleteOne({ id: req.params.id });
            res.status(200).json({
                message: 'User deleted'
            });
        }
        yield Promise.all(teams.map((team) => __awaiter(void 0, void 0, void 0, function* () {
            yield team.remove();
        })));
        res.status(200).json({
            message: 'User and associated teams deleted'
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.deleteUser = deleteUser;
