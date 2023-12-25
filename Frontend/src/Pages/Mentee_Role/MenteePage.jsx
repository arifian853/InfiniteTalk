import { Button } from 'flowbite-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const MenteePage = () => {
    return (
        <div className="forms">
            <Helmet>
                <title>InfiniteTalk! Mentee!</title>
            </Helmet>
            <div className="h-screen text-center landing-page flex flex-col justify-center items-center gap-4">
                <h1 data-aos="zoom-in" className="text-5xl font-bold">Welcome to <span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span> Mentee! </h1>
                <p data-aos="zoom-in" className='w-3/5'>A place to <b className="text-blue-400">discussion</b> with <b className="text-green-400">another Mentees</b>!</p>
                <div className="flex flex-row gap-3">
                    <Link to='/signin'>
                        <Button className='btn-dark'>
                            Sign In
                        </Button>
                    </Link>
                    <Link to='/signup'>
                        <Button className='btn-dark'>
                            Sign Up
                        </Button>
                    </Link>
                </div>
                <Link to='/'>
                    <span className='underline'>Back</span>
                </Link>
            </div>
        </div>
    )
}
