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
        <aside className="h-100 d-flex flex-column border-end border-secondary border-opacity-25" style={{ width: "320px", minWidth: "320px", transition: "all 0.3s ease" }}>
            <div className="p-3 border-bottom border-secondary border-opacity-25">
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
                            className={`d-flex align-items-center gap-3 w-100 p-2 rounded mb-1 border-0 text-start transition-colors ${
                                isSelected ? "bg-primary bg-opacity-25" : "bg-transparent hover-bg-opacity-10"
                            }`}
                             style={{ cursor: "pointer", transition: "background-color 0.2s" }}
                             onMouseEnter={(e) => {
                                 if(!isSelected) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                             }}
                             onMouseLeave={(e) => {
                                 if(!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                             }}
                        >
                            <div className="position-relative">
                                <img
                                    src={user.profilePic || "https://avatar.iran.liara.run/public/boy"} // Fallback image
                                    alt={user.fullName}
                                    className="rounded-circle object-fit-cover border border-secondary"
                                    style={{ width: "48px", height: "48px" }}
                                />
                                {isOnline && (
                                    <span
                                        className="position-absolute bottom-0 end-0 bg-success border border-dark rounded-circle"
                                        style={{ width: "12px", height: "12px" }}
                                    />
                                )}
                            </div>
                            <div className="d-none d-lg-block flex-grow-1" style={{minWidth: 0}}>
                                <div className="d-flex justify-content-between align-items-baseline">
                                     <h6 className="mb-0 text-light text-truncate" style={{fontSize: "0.95rem"}}>{user.fullName}</h6>
                                </div>
                                <p className="mb-0 text-secondary small text-truncate">
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
