
import { NavBar } from "../components/Navbar";
import { UsersSection } from "../components/UsersSection";

const Users = () => {

    return <div className="bg-gray-100">
        <NavBar page="users" />
        <h1 className="w-11/12 m-auto mt-6 bg-white underline text-xl md:text-3xl sm:text-2xl font-bold my-2 p-2 py-4 shadow-xl border-2 border-gray-200">All Users</h1>
        <UsersSection />
    </div>
}

export default Users