import { NavBar } from "../components/Navbar"
import { TeamSection } from "../components/TeamsSection"

const MyTeams = () => {
  return (
    <div className="bg-gray-100">
        <NavBar page="teams" />
        <TeamSection />
    </div>
  )
}

export default MyTeams