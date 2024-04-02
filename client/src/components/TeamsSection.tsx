import { useEffect, useState } from "react";
import { TeamApi } from "../api/team.api";
import { Team } from "../interfaces/interface";
import { TeamCard } from "./TeamCard";
import { useNavigate } from "react-router-dom";

export const TeamSection = () => {
    const token = sessionStorage.getItem('token');
    const [teams, setTeams] = useState<Team[]>([]);
    const navigate  = useNavigate()

    useEffect(() => {
        if (!token) return;
        TeamApi.getMyTeams(token).then(res => {
            setTeams(res.data.teams);
        }).catch(err => {
            alert(err.response.data.message);
        });
    }, []);

    if (teams.length === 0) {
        return <div className="w-11/12 m-auto py-4">
            <h1 className="bg-white underline text-xl md:text-3xl sm:text-2xl font-bold my-2 p-2 py-4 shadow-xl border-2 border-gray-200">My Teams</h1>
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-6xl font-extrabold text-gray-300">no teams to show</p>
            </div>
        </div>
    }

    return <div className="w-11/12 m-auto py-4">
        <h1 className="bg-white underline text-xl md:text-3xl sm:text-2xl font-bold my-2 p-2 py-4 shadow-xl border-2 border-gray-200">My Teams</h1>
        <div className="mt-6">
            {teams.map((team: Team) => (
                <div key={team.id} onClick={() => navigate(`/team/${team.id}`)}>
                    <TeamCard team={team} />
                </div>
            ))}
        </div>
    </div>
}