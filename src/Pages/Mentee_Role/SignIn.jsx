/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Alert, Button, Checkbox } from 'flowbite-react'
import { Helmet } from 'react-helmet'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

import { HiInformationCircle } from 'react-icons/hi'

export const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [navigate, setNavigate] = useState(false)
    const [error, setError] = useState('')
    const [alert, setAlert] = useState('')

    const onChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
        setError('')
    }

    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        setError('')
    }

    const loginBtn = () => {
        const data = {
            username: username,
            password: password
        }

        axios.post('http://localhost:7777/api/user/signin', data)
            .then(result => {
                console.log(result)
                if (result) {
                    setAlert('Login successful!')
                    setTimeout(() => {
                        setNavigate(true)
                    }, 2000)
                } else {
                    setError('Login failed. Please check your credentials.');
                }
            })
            .catch(e => {
                setError(e.response.data.message)
            })
    }

    const backButton = () => {
        window.history.back();
    };

    return (

        <>
            {
                navigate && (
                    <Navigate to="/feed" />
                )
            }
            <div className="forms flex flex-col justify-center items-center gap-4">
                <h1 className='text-3xl font-semibold'>Sign in to <Link to='/'><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span></Link></h1>
                <p>Welcome back, Mentee!</p>
                <Helmet>
                    <title>InfiniteTalk! - Sign In</title>
                </Helmet>
                <div data-aos="zoom-in" className="form-light text-sm flex flex-col text-left items-left gap-2 p-3">
                    {
                        error && (
                            <Alert
                                color="failure"
                                icon={HiInformationCircle}
                            >
                                <span>
                                    <p>
                                        <span className="font-medium">
                                            {error}
                                        </span>

                                    </p>
                                </span>
                            </Alert>
                        )
                    }
                    {
                        alert && (
                            <Alert
                                color="success"
                                icon={HiInformationCircle}
                            >
                                <span>
                                    <p>
                                        <span className="font-medium">
                                            {alert}
                                        </span>

                                    </p>
                                </span>
                            </Alert>
                        )
                    }
                    <p>Username</p>
                    <input type="text" id="username1"
                        placeholder="Your username"
                        required
                        value={username}
                        onChange={onChangeUsername} />
                    <p>Password</p>
                    <input type="password" id="password1"
                        required
                        value={password}
                        onChange={onChangePassword} />
                    <div className="flex items-center gap-2 py-1">
                        <Checkbox id="remember" />
                        <p>Remember me</p>
                    </div>
                    <Button onClick={loginBtn}>
                        Sign In
                    </Button>
                    <div className='text-sm text-center'>
                        <p> Doesn&apos;t have an account? <Link to='/signup'> <span className='underline'>Make one</span> </Link></p>
                        <span onClick={backButton} className='underline cursor-pointer'>Cancel</span>
                    </div>
                </div>
            </div>
        </>

    )
}
