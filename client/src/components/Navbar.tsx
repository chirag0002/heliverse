import { useNavigate } from "react-router-dom";
import { SignIn } from "./SignIn";
import { useSetRecoilState } from "recoil";
import { isSignInVisible } from "../atoms/atoms";

export const NavBar = ({ page }: { page: string }) => {
    const navigate = useNavigate()
    const setShowSignIn = useSetRecoilState(isSignInVisible)

    const token = sessionStorage.getItem('token')

    function handleClick() {
        if (page === "users") {
            if (token) navigate('/myteams')
            else if (!token) setShowSignIn(true)
        } else {
            navigate('/')
        }
    }

    function signIn() {
        if (!token) {
            setShowSignIn(true)
        }
        else {
            navigate('/addteam')
        }
    }

    function account () {
        if (!token) {
            setShowSignIn(true)
        }
        else {
            navigate('/me')
        }
    }

    return (
        <nav className="bg-gray-800 py-4 px-6 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-50">
            <div onClick={() => navigate('/')} className="text-white text-lg sm:text-xl md:text-2xl font-bold cursor-pointer self-start">Heliverse</div>
            <div className="flex text-sm sm:text-base">
                <button
                    className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-l-md"
                    onClick={handleClick}
                >
                    {page === "users" ? "My Teams" : "Show Users"}
                </button>
                <button
                    className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2"
                    onClick={signIn}
                >
                    Create Team
                </button>
                <button
                    className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-r-md"
                    onClick={account}
                >
                    My Account               
                </button>
            </div>
            <SignIn />
        </nav>
    );
};
