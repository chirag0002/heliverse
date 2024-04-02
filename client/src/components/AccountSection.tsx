import { useState, useEffect } from 'react';
import { NavBar } from './Navbar';
import { UserApi } from '../api/user.api';
import { User } from '../interfaces/interface';
import { useNavigate } from 'react-router-dom';

export const AccountSection = () => {
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState<User>(); // State to store user data for editing
  const [isEditable, setIsEditable] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    UserApi.getUser(parseInt(userId)).then((res) => {
      setUser(res.data.user);
      setUserData(res.data.user);
    });
  }, []);

  const handleUpdate = () => {
    setIsEditable(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleSave = () => {
    if (!userId || !userData) return;
    UserApi.updateUser(userData, parseInt(userId)).then((res) => {
      alert(res.data.message);
      setIsEditable(false);
    }).catch((err) => {
      alert(err.response.data.message);
    });
  };

  const handleDeleteConfirmation = () => {
    if (!userId) return;
    UserApi.deleteUser(parseInt(userId)).then((res) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      alert(res.data.message);
      navigate('/');
    }).catch((err) => {
      alert(err.response.data.message);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevData: User | undefined) => {
      return {
        ...(prevData || {}),
        [name]: value
      } as User;
    });
  };




  return (
    <div className="bg-gray-100">
      <NavBar page="account" />
      <h1 className="w-11/12 m-auto mt-6 bg-white underline font-bold my-2 p-2 py-4 shadow-xl border-2 border-gray-200 text-xl md:text-3xl sm:text-2xl">My Account</h1>
      <div className="flex justify-center mt-8">
        <div className="bg-white rounded-lg p-8 shadow-xl w-11/12">
          <img src={user?.avatar} alt="Avatar" className="rounded-full h-24 w-24 mx-auto mb-4 border-2" />

          <div className='flex flex-col sm:flex-row'>
            <div>
              <label className="font-semibold mr-2 text-sm md:text-lg sm:text-base my-1">First Name:</label>
              <input type="text" name="first_name" value={userData?.first_name || ''} onChange={handleInputChange} disabled={!isEditable} className="text-sm md:text-lg sm:text-base font-semibold border-b border-gray-400 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm md:text-lg sm:text-base font-semibold mr-2 sm:mx-2 my-1">Last Name:</label>
              <input type="text" name="last_name" value={userData?.last_name || ''} onChange={handleInputChange} disabled={!isEditable} className="text-sm md:text-lg sm:text-base font-semibold border-b border-gray-400 focus:outline-none" />
            </div>
          </div>

          <div className='flex mt-4 flex-col sm:flex-row'>
            <label className="text-gray-600 mr-2 text-sm md:text-lg sm:text-base">Email:</label>
            <input type="text" name="email" value={userData?.email || ''} onChange={handleInputChange} disabled={!isEditable} className="text-sm md:text-lg sm:text-base text-gray-600 border-b border-gray-400 focus:outline-none block" />
          </div>

          <div className='flex mt-4 flex-col sm:flex-row'>
            <label className="text-gray-600 block mr-2 text-sm md:text-lg sm:text-base">Gender:</label>
            <select name="gender" value={userData?.gender || ''} onChange={handleInputChange} disabled={!isEditable} className="text-sm md:text-lg sm:text-base text-gray-600 border-b border-gray-400 focus:outline-none block">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className='flex mt-4 flex-col sm:flex-row'>
            <label className="text-gray-600 block mr-2 text-sm md:text-lg sm:text-base">Domain:</label>
            <select name="domain" value={userData?.domain || ''} onChange={handleInputChange} disabled={!isEditable} className="text-sm md:text-lg sm:text-base text-gray-600 border-b border-gray-400 focus:outline-none block">
              <option value="IT">IT</option>
              <option value="UI Designing">UI Designing</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Business Development">Business Development</option>
              <option value="Management">Management</option>
            </select>
          </div>

          <div className='flex mt-4 flex-col sm:flex-row '>
            <label className="text-gray-600 block mr-2 text-sm md:text-lg sm:text-base">Availability:</label>
            <select name="available" value={userData?.available ? 'Open to collaborate' : 'Occupied'} onChange={handleInputChange} disabled={!isEditable} className="text-sm md:text-lg sm:text-base text-gray-600 border-b border-gray-400 focus:outline-none block">
              <option value="false">Occupied</option>
              <option value="true">Open to collaborate</option>
            </select>
          </div>

          <div className="flex justify-center mt-6 text-sm md:text-lg sm:text-base">
            {isEditable ? (
              <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none">
                Save
              </button>
            ) : (
              <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none">
                Update
              </button>
            )}
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Delete</button>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.6-.986 2.6-2.472V10.472C21.529 9.014 20.469 8 18.93 8H5.07C3.53 8 2.47 9.014 2.47 10.472v8.056C2.47 17.014 3.53 18 5.07 18z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Account</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to delete your account? This action cannot be undone.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleDeleteConfirmation} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Yes, delete
                </button>
                <button onClick={() => setShowDeleteModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
