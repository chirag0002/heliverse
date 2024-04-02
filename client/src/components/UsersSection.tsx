import { UserCard } from "./UserCard"
import { InputBar } from "./SearchBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { cardsAtom, filterAtoms, isSelectionAllowed, selectedUsersIds } from "../atoms/atoms";
import { useEffect, useState } from "react";
import { UserApi } from "../api/user.api";

export const UsersSection = () => {
    const [users, setUsers] = useRecoilState(cardsAtom)
    const filters = useRecoilValue(filterAtoms)
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)
    const slectedAllowed = useRecoilValue(isSelectionAllowed)
    const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUsersIds)

    useEffect(() => {
        UserApi.getAllUsers({
            page,
            search: filters.search,
            domain: filters.domain,
            gender: filters.gender,
            availability: filters.availability
        }).then((res) => {
            setUsers(res.data.users)
            setTotalPage(res.data.count)
        })
    }, [page, filters]);

    const handleClickChange = (userId:number) => {
        if(selectedUsers.includes(userId)) setSelectedUsers(selectedUsers.filter(id => id !== userId))
        else setSelectedUsers([...selectedUsers, userId])
    }

    return <div>
        <div className="flex flex-col justify-between">
            <div>
                <InputBar />
                <div className="flex flex-wrap w-11/12 m-auto justify-center items-center">
                    {users?.map((user) => (
                        <div key={user.id} className="w-1/2 sm:w-1/3 md:w-1/4 flex flex-col items-center justify-between mb-5">
                            <UserCard user={user} />
                            <input 
                            type="checkbox" 
                            onChange={() => handleClickChange(user.id)}
                            className={`${slectedAllowed ? 'block' : 'hidden'}`} 
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className={`w-28 border-2 border-gray-400 bg-gray-300 rounded-full px-2 shadow-2xl m-4 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {`< Previous`}
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={(Math.ceil(totalPage / 20) === page) || (users.length < 20)}
                    className={`w-28 border-2 border-gray-400 bg-gray-300 rounded-full px-2 shadow-2xl m-4 ${(Math.ceil(totalPage / 20) === page) || (users.length < 20) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {`Next >`}
                </button>
            </div>
        </div>
    </div>
}