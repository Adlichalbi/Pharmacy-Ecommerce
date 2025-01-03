import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const CreateUserForm = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        
    });

    const { createUser, loading } = useUserStore();
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(newUser);
    };

    return (
        <motion.div
            className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Create New User</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300'>User Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={newUser.name}
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
                        value={newUser.email}
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
                        value={newUser.password}
                        onChange={handleChange}
                        className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>Confirm Password</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        value={newUser.confirmPassword}
                        onChange={handleChange}
                        className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                        required
                    />
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
                            Create User
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default CreateUserForm;
