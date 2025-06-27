import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from './ui/button';
import Logo from "../components/shared/Logo";
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const {user} = useSelector (store=>store.auth);// Replace with actual user authentication logic
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            // Network request
            const res = await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }else {
                toast.error("logout failed");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className='border-b border-gray-300 bg-white shadow-sm'>
            <div className='flex items-center justify-between mx-auto h-16 px-4 sm:px-6 lg:px-8'>
                <Logo />
                <div className='flex items-center space-x-4'>
                    { user ? (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar>
                                    <AvatarImage 
                                        src="https://github.com/shadcn.png" 
                                        alt="@shadcn" 
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="popover-content">
                                <button onClick={logoutHandler} className="text-red-600 hover:text-red-700">Logout</button>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <div className="flex space-x-4">
                            <Link to="/login">
                                <Button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Signup</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
}

export default Navbar;