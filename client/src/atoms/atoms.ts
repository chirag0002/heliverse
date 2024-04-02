import { atom } from "recoil";
import { User } from "../interfaces/interface";

export const cardsAtom = atom({
    key: 'cardsAtom',
    default: <User[]>[]
})

export const filterAtoms = atom({
    key: 'filterAtoms',
    default: {
        domain: '',
        gender: '',
        availability: '',
        search: ''
    }
})

export const isSignInVisible = atom({
    key:'isSignInVisible',
    default: false
})

export const isCreateUserVisible = atom({
    key:'isCreateUserVisible',
    default: false
})

export const isSelectionAllowed = atom ({
    key: 'isSelectionAllowed',
    default: false
})

export const selectedUsersIds = atom ({
    key:'selectedUsersIds',
    default: <number[]>[]
})

