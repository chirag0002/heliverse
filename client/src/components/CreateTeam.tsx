import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isSelectionAllowed, selectedUsersIds } from '../atoms/atoms';
import { UsersSection } from './UsersSection';
import { TeamApi } from '../api/team.api';
import { useNavigate } from 'react-router-dom';

export const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');
    const setSelectionAllowed = useSetRecoilState(isSelectionAllowed)
    const selectedUsers = useRecoilValue(selectedUsersIds)
    const token = sessionStorage.getItem('token')
    const navigate = useNavigate()


    useEffect(() => {
        setSelectionAllowed(true)

        return () => {
            setSelectionAllowed(false)
        }
    }, [])

    const submit = ():void => {
        if (token) {
            TeamApi.createTeam(token, { name: teamName, memberIds: selectedUsers }).then(res => {
                alert(res.data.message)
                navigate('/myteams')
            }).catch(err => {
                alert(err.response.data.message)
            })
        }
    }

    return <div className="p-6 rounded-lg flex flex-col items-center justify-between">
        <div>
            <div className='border-2 border-gray-200 shadow-xl p-6'>
                <h2 className="text-xl font-semibold mb-4 underline">Create Team</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Team Name</label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter team name"
                        className="w-full px-3 py-2 rounded-lg border-black-300 outline-none focus:outline-blue-600 border-2 border-gray-300"
                    />
                </div>
            </div>
            <div className='w-full'>
                <h3 className="font-medium m-4 text-center">Select Users</h3>
                <UsersSection />
            </div>
        </div>
        <button
            className='bg-blue-500 shadow-2xl text-lg font-semibold text-center p-2 px-6 mt-5 text-white rounded-full'
            onClick={submit}
        >
            Create Team
        </button>
    </div>
};
