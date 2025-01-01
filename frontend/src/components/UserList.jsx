import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash, Edit } from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const { deleteUser, getAllUsers } = useUserStore();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const usersData = await getAllUsers();
        setUsers(usersData || []); // Fallback to an empty array if null/undefined
    };

    useEffect(() => {
        fetchUsers();
    }, [getAllUsers]);

    const handleDelete = async (userId) => {
        const isDeleted = await deleteUser(userId);
        if (isDeleted) {
            fetchUsers(); // Refresh the user list after successful deletion
        }
    };

    return (
        <motion.div
            className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <table className='min-w-full divide-y divide-gray-700'>
                <thead className='bg-gray-700'>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Name</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Email</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Role</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-800 divide-y divide-gray-700'>
                    {users.map((user) => (
                        <tr key={user._id} className='hover:bg-gray-700'>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-300'>{user.name}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-300'>{user.email}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-300'>{user.role}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                <button
                                    onClick={() => navigate(`/update-user/${user._id}`)}
                                    className='text-green-400 hover:text-green-300 mr-4'
                                >
                                    <Edit className='h-5 w-5' />
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className='text-red-400 hover:text-red-300'
                                >
                                    <Trash className='h-5 w-5' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};



export default UserList;
