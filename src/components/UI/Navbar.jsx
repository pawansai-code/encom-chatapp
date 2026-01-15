import { LogOut, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.auth);

    return (
        <nav className="navbar navbar-expand-lg border-bottom border-white border-opacity-10 backdrop-blur-md sticky-top px-4 shadow-sm" style={{height: "80px", background: "rgba(5, 5, 16, 0.7)"}}>
            <div className="container-fluid px-0">
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                    <div className="p-2 rounded-3" style={{ background: "rgba(255, 46, 99, 0.1)" }}>
                         <MessageSquare size={24} color="#ff2e63" />
                    </div>
                    <span className="fw-bold" style={{ 
                        fontSize: "24px", 
                        background: "linear-gradient(90deg, #ff2e63 0%, #ff5757 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>JarvisChat</span>
                </Link>

                <div className="d-flex align-items-center gap-3">
                    {authUser && (
                        <div className="d-flex align-items-center gap-3">
                            <span className="text-light d-none d-sm-block">
                                Hello, <span className="fw-semibold text-primary-custom">{authUser.fullName}</span>
                            </span>
                            <button 
                                onClick={() => dispatch(logout())}
                                className="btn btn-sm d-flex align-items-center gap-2"
                                style={{
                                    borderColor: "rgba(255, 46, 99, 0.5)",
                                    color: "#ff2e63",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    background: "transparent",
                                    transition: "all 0.3s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255, 46, 99, 0.1)";
                                    e.currentTarget.style.boxShadow = "0 0 10px rgba(255, 46, 99, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
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
