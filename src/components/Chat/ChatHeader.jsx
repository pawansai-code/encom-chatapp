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
    <div className="p-3 border-bottom border-white border-opacity-10 d-flex justify-content-between align-items-center sticky-top" style={{ background: "rgba(5, 5, 10, 0.4)", backdropFilter: "blur(10px)" }}>
      <div className="d-flex align-items-center gap-3">
        <div className="position-relative">
          <img
            src={selectedUser.profilePic || "https://avatar.iran.liara.run/public/boy"}
            alt={selectedUser.fullName}
            className="rounded-circle object-fit-cover"
            style={{ width: "40px", height: "40px", border: "2px solid rgba(255, 46, 99, 0.5)" }}
          />
          {isOnline && (
            <span
              className="position-absolute bottom-0 end-0 bg-success rounded-circle"
              style={{ width: "10px", height: "10px", border: "2px solid #050510", boxShadow: "0 0 5px #22c55e" }}
            ></span>
          )}
        </div>
        <div>
          <h6 className="mb-0 text-light fw-bold" style={{ fontSize: "1.1rem" }}>{selectedUser.fullName}</h6>
          <span className={`small ${isTyping ? "fw-bold animate-pulse" : ""}`} style={{ color: isTyping ? "#ff2e63" : (isOnline ? "#22c55e" : "rgba(255,255,255,0.5)") }}>
            {isTyping ? "Typing..." : (isOnline ? "Online" : "Offline")}
          </span>
        </div>
      </div>
      
      <button 
        className="btn btn-link p-1 text-light opacity-50 hover-opacity-100 transition-opacity"
        onClick={() => dispatch(setSelectedUser(null))}
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default ChatHeader;
