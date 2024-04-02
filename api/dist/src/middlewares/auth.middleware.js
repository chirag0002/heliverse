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
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const db_1 = require("../db/db");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(401).json({ message: 'No auth token provided' });
    (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(401).json({ message: 'Invalid auth token' });
        try {
            const user = yield db_1.User.findOne({ email: decoded.email });
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            req.user = user;
            next();
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }));
});
exports.auth = auth;
