import { BrowserRouter, Route, Routes } from "react-router-dom"
import Users from "./pages/Users"
import MyTeams from "./pages/MyTeams"
import AddTeam from "./pages/AddTeam"
import Account from "./pages/Account"
import Team from "./pages/Team"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/myteams" element ={<MyTeams />} />
        <Route path="/addteam" element ={<AddTeam />} />
        <Route path="/me" element ={<Account />} />
        <Route path="/team/:teamId" element ={<Team />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App