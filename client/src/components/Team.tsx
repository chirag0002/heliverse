import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TeamApi } from "../api/team.api";
import { Team as TeamInterface, User } from "../interfaces/interface";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSelectionAllowed, selectedUsersIds } from "../atoms/atoms";
import { UsersSection } from "./UsersSection";

export const Team = () => {
    const { teamId } = useParams();
    const [team, setTeam] = useState<TeamInterface>();
    const [users, setUsers] = useState<User[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const setSelectionAllowed = useSetRecoilState(isSelectionAllowed)
    const [showSelection, setShowSelection] = useState(false)
    const selectedUsers = useRecoilValue(selectedUsersIds)


    useEffect(() => {
        if (!teamId) return;
        TeamApi.getTeam(teamId).then(res => {
            setTeam(res.data.team);
            setUsers(res.data.team.members);
        }).catch(err => {
            alert(err.response.data.message);
        });
    }, []);

    const getAvailabilityColor = (availability: boolean) => {
        return availability ? "text-green-500" : "text-red-500";
    };

    const handleDeleteTeam = () => {
        if (!token || !teamId) return;
        TeamApi.deleteTeam(teamId, token).then(res => {
            alert(res.data.message);
            navigate('/myteams');
        }).catch(err => {
            alert(err.response.data.message);
        });
    };

    const handleRemoveUser = (userId: number) => {
        if (!teamId || !token) return
        TeamApi.removeUser(teamId, { memberId: userId }, token).then(res => {
            alert(res.data.message);
            window.location.reload()
        }).catch(err => {
            alert(err.response.data.message);
        })
    };

    const toggleUpdateTeam = () => {
        setSelectionAllowed(true)
        setShowSelection(true)
    };

    const handleUpdateTeam = () => {
        if (!token ||!teamId) return;
        TeamApi.addUsers(teamId,{ memberIds:selectedUsers}, token).then(res => {
            alert(res.data.message);
            window.location.reload()
        }).catch(err => {
            alert(err.response.data.message);
        });
    }

    return (
        <div className="w-11/12 m-auto">
            <div className="mt-6 bg-white my-2 p-2 py-4 shadow-xl border-2 border-gray-200">
                <h1 className=" underline text-xl md:text-3xl sm:text-2xl font-bold">{team?.name}</h1>
                <p className="mt-2 text-sm sm:text-base font-light">Admin: {team?.admin}</p>
            </div>
            <div className="flex flex-wrap justify-center">
                {users.map(user => (
                    <div key={user.id} className="m-2 w-5/12 md:w-4/12 lg:w-1/4 bg-white rounded-xl shadow-md flex flex-col justify-between">
                        <img className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 m-auto bg-gray-100 rounded-full" src={user.avatar} alt="User Avatar" />
                        <div className="p-2">
                            <div className="text-sm sm:text-base md:text-lg font-bold mb-2">{`${user.first_name} ${user.last_name}`}</div>
                            <p className="text-gray-600 text-sm sm:text-base md:text-lg">Email: {user.email}</p>
                            <p className="text-gray-600 text-sm sm:text-base md:text-lg">Domain: {user.domain}</p>
                            <p className="text-gray-600 text-sm sm:text-base md:text-lg">Gender: {user.gender}</p>
                            <p className={`text-gray-600 text-sm sm:text-base md:text-lg ${getAvailabilityColor(user.available)}`}>{user.available ? "Open to collab" : "Occupied"}</p>
                        </div>
                        <div className="flex justify-center my-2">
                            <button onClick={() => handleRemoveUser(user.id)} className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold p-1 sm:py-2 sm:px-4 rounded focus:outline-none">
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            { showSelection && 
            <UsersSection />
            }
            <div className="flex items-center justify-center my-5 text-sm sm:text-base">
                {showSelection ? (
                    <>
                        <button onClick={handleUpdateTeam} className="bg-blue-500 hover:bg-blue-700 text-white font-bold sm:py-2 sm:px-4 p-1 mr-2 rounded focus:outline-none">
                            Update Team
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={toggleUpdateTeam} className="bg-blue-500 hover:bg-blue-700 text-white font-bold sm:py-2 sm:px-4 p-1 mr-2 rounded focus:outline-none">
                            Update Team
                        </button>
                    </>
                )
                }
                <button onClick={() => setShowDeleteModal(true)} className="bg-red-500 hover:bg-red-700 text-white font-bold sm:py-2 sm:px-4 p-1 rounded focus:outline-none">
                    Delete Team
                </button>
            </div>
            {showDeleteModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.6-.986 2.6-2.472V10.472C21.529 9.014 20.469 8 18.93 8H5.07C3.53 8 2.47 9.014 2.47 10.472v8.056C2.47 17.014 3.53 18 5.07 18z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Team</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Are you sure you want to delete this team? This action cannot be undone.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleDeleteTeam} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Yes, delete
                                </button>
                                <button onClick={() => setShowDeleteModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
