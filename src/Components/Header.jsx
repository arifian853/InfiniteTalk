import { Avatar, Button, Dropdown, Navbar } from "flowbite-react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import toast from "react-hot-toast";
import stables from "../Constants/stables";

export const Header = () => {
    const logoutHandler = () => {
        dispatch(logout());
        toast.success("Log out success")
        navigate("/");
    };
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    return (
        <div>
            <Navbar fluid rounded>
                <Navbar.Brand>
                    <h1 className='text-2xl font-semibold'><Link to='/'><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span></Link></h1>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    {userState.userInfo ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img={stables.UPLOAD_FOLDER_BASE_URL + userState.userInfo.avatar} rounded />
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
                                <Dropdown.Item onClick={() => navigate("/admin")}>Admin Dashboard</Dropdown.Item>
                            )}
                            <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
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

