import { Button, Checkbox } from 'flowbite-react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

export const SignIn = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return (
        <div className="forms flex flex-col justify-center items-center gap-4">
            <h1 className='text-3xl font-semibold'>Sign in to <Link to='/'><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span></Link></h1>
            <p>Welcome back, Mentee!</p>
            <Helmet>
                <title>InfiniteTalk! - Sign In</title>
            </Helmet>
            <div data-aos="zoom-in" className="form-light text-sm flex flex-col text-left items-left gap-2 p-3">
                <p>Username</p>
                <input type="text" />
                <p>Password</p>
                <input type="password" name="" id="" />
                <div className="flex items-center gap-2 py-1">
                    <Checkbox id="remember" />
                    <p>Remember me</p>
                </div>
                <Button>
                    Sign In
                </Button>
                <div className='text-sm text-center'>
                    <p> Doesn&apos;t have an account? <Link to='/signup'> <span className='underline'>Make one</span> </Link></p>
                    <span onClick={goBack} className='underline cursor-pointer'>Cancel</span>
                </div>
            </div>
        </div>
    )
}
