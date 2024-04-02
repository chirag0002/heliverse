import { Request, Response } from 'express'
import { Team, User } from '../db/db'


export const createTeam = async (req: Request, res: Response) => {
    let { name, memberIds } = req.body
    const user = req.user

    memberIds = [...memberIds, user.id]

    try {

        const membersToAdd = await User.find({ id: { $in: memberIds }, available: true });
        if (membersToAdd.length !== memberIds.length) {
            return res.status(400).json({ message: 'One or more member do not exist or are occupied' });
        }

        const domains = new Set<string>();

        for (const newMember of membersToAdd) {
            if (domains.has(newMember.domain)) {
                return res.status(400).json({ message: 'Two users with the same domain cannot be in the team' });
            }
            domains.add(newMember.domain);
        }

        const team = new Team({
            name: name,
            admin: {
                email: user.email,
                name: user.first_name + ' ' + user.last_name
            },
            members: memberIds || []
        });

        await team.save()

        res.status(200).json({ message: 'Team successfully created' })
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const getMyTeams = async (req: Request, res: Response) => {
    try {
        const teams = await Team.find({ "admin.email": req.user.email })

        const teamsData = await Promise.all(teams.map(async (team: any) => {
            const users = await User.find({ id: { $in: team.members } });

            return {
                id: team._id,
                name: team.name,
                admin: team.admin.name,
                members: users
            };
        }));

        res.status(200).json({
            teams: teamsData
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const addUser = async (req: Request, res: Response) => {
    const { teamId } = req.params
    const { memberIds } = req.body

    try {
        const team = await Team.findById(teamId)
        if (!team) return res.status(404).json({ message: 'Team not found' })

        if (team.admin.email !== req.user.email) return res.status(401).json({ message: 'Unauthorized' })
        const membersToAdd = await User.find({ id: { $in: memberIds }, available: true });
        if (membersToAdd.length !== memberIds.length) {
            return res.status(400).json({ message: 'One or more member do not exist or are ocuupied' });
        }

        const members = memberIds.filter((memberId: number) => !team.members.includes(memberId))
        if (members.length !== memberIds.length) {
            return res.status(400).json({ message: 'One or more members are already in the team' })
        }

        const teamMembers = await User.find({ id: { $in: team.members } })
        const teamDomains = new Set(teamMembers.map((member: any) => member.domain))

        for (const newMember of membersToAdd) {
            if (teamDomains.has(newMember.domain)) {
                return res.status(400).json({ message: 'Two users with the same domain cannot be in the team' });
            }
        }

        team.members.push(...memberIds)
        await team.save();

        res.status(200).json({
            message: "User added to the team"
        });


    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const removeUser = async (req: Request, res: Response) => {
    const { teamId } = req.params
    const { memberId } = req.body

    try {
        const team = await Team.findById(teamId)
        if (!team) return res.status(404).json({ message: 'Team not found' })

        if (team.admin.email === req.user.email) {
            if(memberId === req.user.id) return res.status(401).json({ message: "Admin can't be removed from the team"})
            team.members = team.members.filter((member: any) => member != memberId);

            await team.save()

            res.status(200).json({
                message: "User removed from the team"
            });
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const getTeam = async (req: Request, res: Response) => {
    const { teamId } = req.params

    try {
        const team = await Team.findById(teamId)
        if (!team) return res.status(404).json({ message: 'Team not found' })

        const userIds = team.members
        const users = await User.find({ id: { $in: userIds } })
        const data = {
            id: team._id,
            name: team.name,
            admin: team.admin.name,
            members: users
        }
        res.status(200).json({
            team: data
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const deleteTeam = async (req: Request, res: Response) => {
    const { teamId } = req.params

    try {
        const team = await Team.findById(teamId)
        if (!team) return res.status(404).json({ message: 'Team not found' })

        if (team.admin.email === req.user.email) {
            await Team.findByIdAndDelete(teamId)

            res.status(200).json({
                message: 'Team deleted'
            });
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}