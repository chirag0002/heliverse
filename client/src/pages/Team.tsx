import { NavBar } from "../components/Navbar"
import { Team } from "../components/Team"

const TeamPage = () => {
  return (
    <div className="bg-gray-100">
        <NavBar page="team" /> 
        <Team />
    </div>
  )
}

export default TeamPage