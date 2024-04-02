import { useRecoilState, useSetRecoilState } from "recoil";
import { LabeledInput } from "./InputField";
import { isCreateUserVisible, isSignInVisible } from "../atoms/atoms";
import { useState } from "react";
import { UserApi } from "../api/user.api";
import { UserPayload } from "../interfaces/interface";


const initialPayload: UserPayload = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    avatar: '',
    domain: '',
    available: true
}

export const CreateUser = () => {
    const [showCreateUser, setShowCreateUser] = useRecoilState(isCreateUserVisible)
    const setShowSignIn = useSetRecoilState(isSignInVisible)
    const [userInputs, setUserInputs] = useState<UserPayload>(initialPayload)

    const submit = () => {
        UserApi.createUser(userInputs).then((res) => {
            sessionStorage.setItem("token", res.data.token)
            sessionStorage.setItem("userId", res.data.userId)
            setShowCreateUser(false)
            setShowSignIn(false)
            alert(res.data.message)
            window.location.reload()
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }

    return (
        <div className="flex justify-center items-center h-screen" style={{ display: showCreateUser ? 'block' : 'none' }}>
            <div className="bg-gray-400 bg-opacity-70 absolute inset-0 z-10 flex justify-center items-center">
                <div className="relative bg-white p-8 rounded-lg shadow-md">
                    <div
                        className="absolute top-4 right-4 font-bold rounded-full bg-gray-200 w-6 text-center cursor-pointer"
                        onClick={() => {
                            setShowCreateUser(!showCreateUser)
                            setShowSignIn(false)
                        }}
                    >
                        x
                    </div>
                    <h2 className="text-lg font-semibold mb-4">Add User</h2>

                    <LabeledInput
                        label="Avatar"
                        placeholder="Image link"
                        onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                avatar: e.target.value
                            })
                        }}
                        type="text"
                    />

                    <LabeledInput
                        label="First Name"
                        placeholder="John"
                        onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                first_name: e.target.value
                            })
                        }}
                        type="text"
                    />

                    <LabeledInput
                        label="Last Name"
                        placeholder="Doe"
                        onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                last_name: e.target.value
                            })
                        }}
                        type="text"
                    />

                    <LabeledInput
                        label="Email"
                        placeholder="Enter your email"
                        onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                email: e.target.value
                            })
                        }}
                        type="email"
                    />

                    <label className="block mb-1 text-sm font-medium">Domain</label>
                    <select
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-96 p-2.5"
                        onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                domain: e.target.value
                            })
                        }}
                    >
                        <option value=''>Select Domain</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="UI Designing">UI Designing</option>
                        <option value="Business Development">Business Development</option>
                        <option value="Finance">Finance</option>
                        <option value="IT">IT</option>
                        <option value="Management">Management</option>
                    </select>

                    <label className="block mb-1 text-sm font-medium">Gender</label>
                    <select
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-96 p-2.5"
                        onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                gender: e.target.value
                            })
                        }}
                    >
                        <option value=''>Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>

                    <label className="block mb-1 text-sm font-medium">Availability</label>
                    <select
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-96 p-2.5"
                        onChange={(e) => {
                            let value
                            if (e.target.value === "true") {
                                value = true
                            } else {
                                value = false
                            }
                            setUserInputs({
                                ...userInputs,
                                available: value
                            })
                        }}
                    >
                        <option value=''>Select Availability</option>
                        <option value="true">Open To Collab</option>
                        <option value="false">Occupied</option>
                    </select>

                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                        onClick={submit}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};
