import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/chatSlice";

const ChatHeader = () => {
  const { selectedUser, onlineUsers, typingUsers } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const isOnline = onlineUsers.includes(selectedUser?._id);
  const isTyping = typingUsers.includes(selectedUser?._id);

  if (!selectedUser) return null;

  return (
    <div className="p-3 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center bg-dark bg-opacity-25 backdrop-blur-sm sticky-top">
      <div className="d-flex align-items-center gap-3">
        <div className="position-relative">
          <img
            src={selectedUser.profilePic || "https://avatar.iran.liara.run/public/boy"}
            alt={selectedUser.fullName}
            className="rounded-circle object-fit-cover border border-secondary"
            style={{ width: "40px", height: "40px" }}
          />
          {isOnline && (
            <span
              className="position-absolute bottom-0 end-0 bg-success border border-dark rounded-circle"
              style={{ width: "10px", height: "10px" }}
            ></span>
          )}
        </div>
        <div>
          <h6 className="mb-0 text-light fw-semibold">{selectedUser.fullName}</h6>
          <span className={`small ${isTyping ? "text-primary-custom fw-bold animate-pulse" : isOnline ? "text-success" : "text-secondary"}`}>
            {isTyping ? "Typing..." : (isOnline ? "Online" : "Offline")}
          </span>
        </div>
      </div>
      
      <button 
        className="btn btn-link text-secondary p-1"
        onClick={() => dispatch(setSelectedUser(null))}
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default ChatHeader;
