import React from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Logo from "../components/shared/Logo";
import { Link,useNavigate} from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const Signup = () => {
    const [input, setInput] = React.useState({
        fullname: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const changeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
           const res= await axios.post('http://localhost:8000/api/v1/user/register',input,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
           });
              console.log(res);
              if(res.data.success){
                toast.success(res.data.message);
                navigate('/login');
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
                    <Label className='block text-gray-700 text-sm font-bold mb-2'>Full Name</Label>
                    <Input 
                        type="text"
                        name="fullname"
                        value={input.fullname}
                        onChange={changeHandler}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
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
                    <Button className='w-full my-5'>Signup</Button>
                    <p className='text-sm text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Signup;