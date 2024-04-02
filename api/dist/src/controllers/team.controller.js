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
exports.deleteTeam = exports.getTeam = exports.removeUser = exports.addUser = exports.getMyTeams = exports.createTeam = void 0;
const db_1 = require("../db/db");
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, memberIds } = req.body;
    const user = req.user;
    memberIds = [...memberIds, user.id];
    try {
        const membersToAdd = yield db_1.User.find({ id: { $in: memberIds }, available: true });
        if (membersToAdd.length !== memberIds.length) {
            return res.status(400).json({ message: 'One or more member do not exist or are occupied' });
        }
        const domains = new Set();
        for (const newMember of membersToAdd) {
            if (domains.has(newMember.domain)) {
                return res.status(400).json({ message: 'Two users with the same domain cannot be in the team' });
            }
            domains.add(newMember.domain);
        }
        const team = new db_1.Team({
            name: name,
            admin: {
                email: user.email,
                name: user.first_name + ' ' + user.last_name
            },
            members: memberIds || []
        });
        yield team.save();
        res.status(200).json({ message: 'Team successfully created' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.createTeam = createTeam;
const getMyTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield db_1.Team.find({ "admin.email": req.user.email });
        const teamsData = yield Promise.all(teams.map((team) => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield db_1.User.find({ id: { $in: team.members } });
            return {
                id: team._id,
                name: team.name,
                admin: team.admin.name,
                members: users
            };
        })));
        res.status(200).json({
            teams: teamsData
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getMyTeams = getMyTeams;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = req.params;
    const { memberIds } = req.body;
    try {
        const team = yield db_1.Team.findById(teamId);
        if (!team)
            return res.status(404).json({ message: 'Team not found' });
        if (team.admin.email !== req.user.email)
            return res.status(401).json({ message: 'Unauthorized' });
        const membersToAdd = yield db_1.User.find({ id: { $in: memberIds }, available: true });
        if (membersToAdd.length !== memberIds.length) {
            return res.status(400).json({ message: 'One or more member do not exist or are ocuupied' });
        }
        const members = memberIds.filter((memberId) => !team.members.includes(memberId));
        if (members.length !== memberIds.length) {
            return res.status(400).json({ message: 'One or more members are already in the team' });
        }
        const teamMembers = yield db_1.User.find({ id: { $in: team.members } });
        const teamDomains = new Set(teamMembers.map((member) => member.domain));
        for (const newMember of membersToAdd) {
            if (teamDomains.has(newMember.domain)) {
                return res.status(400).json({ message: 'Two users with the same domain cannot be in the team' });
            }
        }
        team.members.push(...memberIds);
        yield team.save();
        res.status(200).json({
            message: "User added to the team"
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.addUser = addUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = req.params;
    const { memberId } = req.body;
    try {
        const team = yield db_1.Team.findById(teamId);
        if (!team)
            return res.status(404).json({ message: 'Team not found' });
        if (team.admin.email === req.user.email) {
            if (memberId === req.user.id)
                return res.status(401).json({ message: "Admin can't be removed from the team" });
            team.members = team.members.filter((member) => member != memberId);
            yield team.save();
            res.status(200).json({
                message: "User removed from the team"
            });
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.removeUser = removeUser;
const getTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = req.params;
    try {
        const team = yield db_1.Team.findById(teamId);
        if (!team)
            return res.status(404).json({ message: 'Team not found' });
        const userIds = team.members;
        const users = yield db_1.User.find({ id: { $in: userIds } });
        const data = {
            id: team._id,
            name: team.name,
            admin: team.admin.name,
            members: users
        };
        res.status(200).json({
            team: data
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getTeam = getTeam;
const deleteTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = req.params;
    try {
        const team = yield db_1.Team.findById(teamId);
        if (!team)
            return res.status(404).json({ message: 'Team not found' });
        if (team.admin.email === req.user.email) {
            yield db_1.Team.findByIdAndDelete(teamId);
            res.status(200).json({
                message: 'Team deleted'
            });
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.deleteTeam = deleteTeam;
