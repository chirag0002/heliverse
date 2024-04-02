import { User } from "../interfaces/interface"

export const UserCard = ({ user }: { user: User }) => {
    return <div className={` w-11/12 bg-white flex cursor-pointer hover:bg-gray-200 justify-between flex-col m-4 shadow-2xl p-4 ${user.available ? 'border-2 border-green-500' : 'border-2 border-red-500'}`}>
        <div>
            <div className="flex flex-col justify-center items-center">
                <img src={user.avatar} alt="img" className="bg-gray-200 rounded-full w-3/4 sm:w-2/4 md:w-1/4 p-1 my-2" />
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-center">{`${user.first_name} ${user.last_name}`}</h1>
                <p className="my-2 text-sm sm:text-base md:text-lg text-center">{user.domain}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center w-11/12 m-auto mt-3 text-sm sm:text-base text-center">
                <div className="my-2 flex flex-col justify-center items-center">
                    <p className="font-semibold">Availability</p>
                    <p className={`${user.available ? "bg-green-300" : "bg-red-300"} w-fit px-1 rounded-lg`}>{user.available ? "Open to collab" : "Occupied"}</p>
                </div>
                <div className="my-2 flex flex-col justify-center items-center">
                    <p className="font-semibold">Gender</p>
                    <p>{user.gender}</p>
                </div>
            </div>
        </div>
    </div>
}