"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = exports.User = void 0;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.DB);
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    first_name: {
        type: String,
        maxlength: 64,
        required: true
    },
    last_name: {
        type: String,
        maxlength: 64,
        required: true
    },
    email: {
        type: String,
        unique: true,
        maxlength: 128
    },
    gender: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
});
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    admin: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    members: [
        {
            type: Number,
            ref: 'User'
        }
    ]
});
exports.User = mongoose.model('User', userSchema);
exports.Team = mongoose.model('Team', teamSchema);
