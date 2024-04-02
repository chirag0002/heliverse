import { Request, Response } from 'express'
import { Team, User } from '../db/db'
import { sign } from 'jsonwebtoken'


export const getAllUsers = async (req: Request, res: Response) => {
    const { page = '1', pageSize = '20' } = req.query
    const { available, domain, gender, search } = req.query as { available?: string, domain?: string, gender?: string, search?: string }
    const query: any = {}

    if (available !== undefined){
        if(available === 'true') query.available = true
        if(available === 'false') query.available = false
    }
    if (domain !== undefined) query.domain = domain
    if (gender !== undefined) query.gender = gender
    if (search !== undefined) {
        query.$or = [
            { first_name: { $regex: search, $options: 'i' } },
            { last_name: { $regex: search, $options: 'i' } }
        ]
    }

    try {
        const users = await User.find(query)
            .limit(Number(pageSize))
            .skip((Number(page) - 1) * Number(pageSize));

        const count = await User.countDocuments({})

        res.status(200).json({
            users: users,
            count: count
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}


export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ id: req.params.id })
        if (!user) return res.status(404).json({ message: 'User not found' })

        res.status(200).json({
            user: user
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const addUser = async (req: Request, res: Response) => {
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body
    try {
        const count = await User.countDocuments({})

        const user = new User({
            id: count + 1,
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            avatar: avatar,
            domain: domain,
            available: available
        });

        await user.save()

        const token = sign({ email: user.email }, process.env.SECRET_KEY)

        res.status(200).json({
            message: "User saved successfully",
            token: token,
            userId: user.id
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const userAuth = async (req: Request, res: Response) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email: email })
        if (!user) return res.status(404).json({ message: 'User not found' })


        const token = sign({ email: user.email }, process.env.SECRET_KEY)

        res.status(200).json({
            message: "User signedIn successfully",
            token: token,
            userId: user.id

        })
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body
    try {
        let user = await User.findOne({ id: req.params.id })
        if (!user) return res.status(404).json({ message: 'User not found' })

        user.first_name = first_name || user.first_name
        user.last_name = last_name || user.last_name
        user.email = email || user.email
        user.gender = gender || user.gender
        user.avatar = avatar || user.avatar
        user.domain = domain || user.domain
        user.available = available || user.available

        await user.save()

        res.status(200).json({
            message: "User updated successfully"
        });

    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ id: req.params.id })
        if (!user) return res.status(404).json({ message: 'User not found' })

        const teams = await Team.find({"admin.email" : req.user.email})

        if (!teams.length || user.email === req.user.email) {
            await User.deleteOne({ id: req.params.id })

            res.status(200).json({
                message: 'User deleted'
            });
        }

        await Promise.all(teams.map(async (team:any) => {
            await team.remove();
        }));

        res.status(200).json({
            message: 'User and associated teams deleted'
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}