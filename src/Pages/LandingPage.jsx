import { Button } from 'flowbite-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
    return (
        <div className="">
            <Helmet>
                <title>InfiniteTalk!</title>
            </Helmet>
            <div className="h-screen landing-page flex flex-col justify-center items-center gap-4">
                <h1 data-aos="zoom-in" className="text-5xl font-bold">Welcome to <span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span> </h1>
                <p data-aos="zoom-in">A place for <Link to='/mentors'>Mentors</Link> and Mentee <b className="text-blue-400">connect</b> and <b className="text-green-400">grow</b>!</p>
                <div className="flex flex-row gap-3">
                    <Link to='/signin'>
                        <Button className='btn-dark'>
                            Let me in
                        </Button>
                    </Link>
                    <Link to='/signup'>
                        <Button className='btn-dark'>
                            I&apos;m just started
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
