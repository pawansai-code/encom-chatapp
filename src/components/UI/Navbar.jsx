import { LogOut, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.auth);

    return (
        <nav className="navbar navbar-expand-lg border-bottom border-secondary border-opacity-25 bg-dark bg-opacity-50 backdrop-blur-sm sticky-top px-4 shadow-sm" style={{height: "64px"}}>
            <div className="container-fluid px-0">
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-3">
                         <MessageSquare size={24} className="text-primary-custom" />
                    </div>
                    <span className="text-light fw-bold">JarvisChat</span>
                </Link>

                <div className="d-flex align-items-center gap-3">
                    {authUser && (
                        <div className="d-flex align-items-center gap-3">
                            <span className="text-light d-none d-sm-block">
                                Hello, <span className="fw-semibold text-primary-custom">{authUser.fullName}</span>
                            </span>
                            <button 
                                onClick={() => dispatch(logout())}
                                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 border-opacity-50"
                            >
                                <LogOut size={16} />
                                <span className="d-none d-sm-inline">Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
