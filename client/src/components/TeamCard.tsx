import { Team, User } from "../interfaces/interface";

export const TeamCard = ({team}:{team:Team}) => {
    return <div className="p-4 border rounded-lg my-4 m-auto bg-white shadow-xl cursor-pointer">
        <p className="text-lg sm:text-xl md:text-2xl font-smebold">{team.name}</p>
        <p className="text-sm sm:text-base md:text-lg font-thin">Admin: {team.admin}</p>
        <div>
            {team.members.map((member: User) => (
                <div key={member.id} className="border p-4 my-2 rounded-lg">
                    <UserCard
                        name={`${member.first_name} ${member.last_name}`}
                        gender={member.gender}
                        domain={member.domain}
                        img={member.avatar}
                    />
                </div>
            ))}
        </div>
    </div>
}

function UserCard({ name, gender, domain, img }: { name: string, gender: string, domain: string, img: string }) {
    return (
        <div className="sm:text-center grid sm:grid-cols-3 gap-2 sm:items-center">
            <div className="flex items-center">
                <img src={img} alt="" className=" w-8 sm:w-10 bg-gray-200 rounded-full p-1 mr-4" />
                <p className="font-bold text-sm sm:text-base md:text-lg">{name}</p>
            </div>
            <p className="text-sm sm:text-base md:text-lg">{gender}</p>
            <p className="text-sm sm:text-base md:text-lg">{domain}</p>
        </div>
    );
}
