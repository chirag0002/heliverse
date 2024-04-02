import { CreateTeam } from "../components/CreateTeam"
import { NavBar } from "../components/Navbar"

export const AddTeam = () => {
  return (
    <div>
        <NavBar page="teams" />
        <CreateTeam />
    </div>
  )
}

export default AddTeam