import { Avatar, Button, Dropdown, Modal, Navbar } from "flowbite-react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import toast from "react-hot-toast";
import stables from "../Constants/stables";
import { useState } from "react";

export const Header = () => {
    const logoutHandler = () => {
        dispatch(logout());
        toast.success("Sign out success!")
        navigate("/");
    };
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState('')

    return (
        <div>
            <Modal data-aos="fade-in" show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                <div>
                    <Modal.Header className='modal-title'> <h1 className='modal-title'>Sign out?</h1> </Modal.Header>
                    <Modal.Body className='modal-body'>
                        <div className="space-y-6 divide-y">
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <h1 className="text-2xl text-white font-semibold">Are you sure want to sign out?</h1>
                                <div className="mt-2 flex flex-row gap-2">
                                    <Button className="btn-dark" onClick={() => setOpenModal(undefined)}>
                                        Cancel
                                    </Button>
                                    <Button className="btn-dark" onClick={logoutHandler}>
                                        Sign out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
            <Navbar className="bg-slate-800" fluid rounded>
                <Navbar.Brand>
                    <h1 className='text-2xl font-semibold'><Link to='/feed'><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span></Link></h1>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    {userState.userInfo ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img={
                                    userState.userInfo.avatar
                                        ? stables.UPLOAD_FOLDER_BASE_URL + userState.userInfo.avatar
                                        : "user.png"} rounded />
                            }

                        >
                            <Dropdown.Header>
                                <span className="block text-sm font-medium">{userState.userInfo.fullName}</span>
                                <span className="block truncate text-sm">{userState.userInfo.email}</span>
                                <span className="block truncate text-sm font-medium text-green-400">{userState.userInfo.mentor ? "Mentor" : "Mentee"} @ {userState.userInfo.program} </span>
                            </Dropdown.Header>
                            <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate("/profile-settings")}>Profile Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            {userState?.userInfo?.admin && (
                                <Dropdown.Item onClick={() => navigate("/admin")}>Admin Page</Dropdown.Item>
                            )}
                            <Dropdown.Item onClick={() => navigate("/tos")}>Terms of Service</Dropdown.Item>
                            <Dropdown.Item onClick={() => setOpenModal('default')}>Sign out</Dropdown.Item>
                        </Dropdown>

                    ) : (
                        <Button onClick={() => navigate("/signin")}>
                            Sign In
                        </Button>
                    )
                    }

                    <Navbar.Toggle />
                </div>
                {userState.userInfo ? (
                    <Navbar.Collapse>
                        <Navbar.Link>
                            <Link to='/feed'>
                                Feed
                            </Link>
                        </Navbar.Link>
                        <Navbar.Link>
                            <Link to='/about'>
                                About
                            </Link>
                        </Navbar.Link>
                    </Navbar.Collapse>
                ) : (
                    <></>
                )}
            </Navbar>
        </div>
    )
}

