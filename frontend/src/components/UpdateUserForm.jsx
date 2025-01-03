import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useParams, useNavigate } from "react-router-dom"; 


const UpdateUserForm = () => {
    const [updatedUser, setUpdatedUser] = useState({
        name: "",
        email: "",
        password: "",
        role:"",
        
    });

    const { updateUser, loading } = useUserStore();
    const navigate = useNavigate();
    const Roles = ["admin","customer"]
    const { id } = useParams(); // Get userId from the URL
    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!id){
            console.log("Error: User ID is missing!");
            return
        }
        try {
            await updateUser(id,updatedUser);
            setUpdatedUser({ name: "", email: "", password: "", role: "" });
            navigate("/secret-dashboard");

        } catch (error) {
            console.log("Error updating the user")
        }
    };

    return (
        <motion.div
            className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Update User</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300'>User Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={updatedUser.name}
                        onChange={handleChange}
                        className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-300'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={updatedUser.email}
                        onChange={handleChange}
                        className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-300'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={updatedUser.password}
                        onChange={handleChange}
                        className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                        required
                    />
                </div>
                
                <div>
          <label htmlFor='role' className='block text-sm font-medium text-gray-300'>
            Role
          </label>
          <select
            id='role'
            name='role'
            value={updatedUser.role}
            onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
            className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
            shadow-sm py-2 px-3 text-white focus:outline-none 
            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            required
          >
            <option value=''>Select a role</option>
            {Roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
                <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                            Loading...
                        </>
                    ) : (
                        <>
                            <PlusCircle className='mr-2 h-5 w-5' />
                            Update User
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default UpdateUserForm;
