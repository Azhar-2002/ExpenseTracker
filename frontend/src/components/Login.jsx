import React from 'react';
import { useState } from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
// import Logo from './shared/logo';
import Logo from "../components/shared/Logo";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';


const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
           const res= await axios.post('http://localhost:8000/api/v1/user/login',input,{
            headers: {
                'Content-Type': 'application/json'
            },
             withCredentials: true
           });
              console.log(res.data);
              if(res.data.success){
                dispatch(setAuthUser(res.data.user));
                toast.success(res.data.message);
                navigate("/home");
              }
        }catch(error){
            toast.error(error.response.data.message);
        }
    }


    return (
        <div className='flex items-center justify-center w-screen h-screen bg-gray-100'>
            <form onSubmit={submitHandler} className='w-96 p-8 bg-white rounded-lg shadow-lg'>
                <div className='w-full flex justify-center mb-5'>
                    <Logo />
                </div>
                <div className='mb-4'>
                    <Label className='block text-gray-700 text-sm font-bold mb-2'>Email</Label>
                    <Input 
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeHandler}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-6'>
                    <Label className='block text-gray-700 text-sm font-bold mb-2'>Password</Label>
                    <Input 
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeHandler}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div>
                    <Button className='w-full my-5'>Login</Button>
                    <p className='text-sm text-center'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;