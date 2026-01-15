import { Users } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setSelectedUser } from "../../store/chatSlice";
import UsersLoadingSkeleton from "../UI/UsersLoadingSkeleton";

const ChatsList = () => {
    const dispatch = useDispatch();
    const { users, selectedUser, isUsersLoading, onlineUsers } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    if (isUsersLoading) return <UsersLoadingSkeleton />;

    return (
        <aside className="h-100 d-flex flex-column border-end border-white border-opacity-10" style={{ width: "320px", minWidth: "320px", transition: "all 0.3s ease", background: "rgba(5, 5, 10, 0.2)" }}>
            <div className="p-3 border-bottom border-white border-opacity-10">
                 <div className="d-flex align-items-center gap-2 text-light">
                    <Users size={20} className="text-secondary" />
                    <h6 className="mb-0 fw-semibold">Contacts</h6>
                 </div>
            </div>

            <div className="flex-grow-1 overflow-auto custom-scrollbar p-2">
                {users.map((user) => {
                     const isOnline = onlineUsers.includes(user._id);
                     const isSelected = selectedUser?._id === user._id;

                     return (
                        <button
                            key={user._id}
                            onClick={() => dispatch(setSelectedUser(user))}
                            className={`d-flex align-items-center gap-3 w-100 p-2 rounded mb-1 border-0 text-start transition-colors`}
                             style={{ 
                                 cursor: "pointer", 
                                 transition: "all 0.2s ease",
                                 backgroundColor: isSelected ? "rgba(255, 46, 99, 0.1)" : "transparent",
                                 border: isSelected ? "1px solid rgba(255, 46, 99, 0.3)" : "1px solid transparent",
                             }}
                             onMouseEnter={(e) => {
                                 if(!isSelected) {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                 }
                             }}
                             onMouseLeave={(e) => {
                                 if(!isSelected) {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.transform = "translateY(0)";
                                 }
                             }}
                        >
                            <div className="position-relative">
                                <img
                                    src={user.profilePic || "https://avatar.iran.liara.run/public/boy"} // Fallback image
                                    alt={user.fullName}
                                    className="rounded-circle object-fit-cover"
                                    style={{ 
                                        width: "48px", 
                                        height: "48px",
                                        border: isSelected ? "2px solid #ff2e63" : "2px solid rgba(255,255,255,0.1)"
                                    }}
                                />
                                {isOnline && (
                                    <span
                                        className="position-absolute bottom-0 end-0 bg-success rounded-circle"
                                        style={{ 
                                            width: "12px", 
                                            height: "12px",
                                            border: "2px solid #050510",
                                            boxShadow: "0 0 5px #22c55e"
                                        }}
                                    />
                                )}
                            </div>
                            <div className="d-none d-lg-block flex-grow-1" style={{minWidth: 0}}>
                                <div className="d-flex justify-content-between align-items-baseline">
                                     <h6 className={`mb-0 text-truncate ${isSelected ? "fw-bold" : ""}`} style={{ fontSize: "0.95rem", color: isSelected ? "#ff2e63" : "white" }}>{user.fullName}</h6>
                                </div>
                                <p className="mb-0 small text-truncate" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                    {isOnline ? "Online" : "Offline"}
                                </p>
                            </div>
                        </button>
                     );
                })}
                 
                 {users.length === 0 && (
                     <div className="text-center text-secondary mt-5">
                         <p>No contacts found.</p>
                     </div>
                 )}
            </div>
        </aside>
    );
};

export default ChatsList;
