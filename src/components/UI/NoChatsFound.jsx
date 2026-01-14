import { MessageSquareOff } from "lucide-react";

const NoChatsFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center p-4">
      <div className="bg-secondary bg-opacity-10 p-4 rounded-circle mb-3 animate-bounce">
        <MessageSquareOff size={48} className="text-secondary" />
      </div>
      <h5 className="text-light fw-bold mb-2">No Chats Found</h5>
      <p className="text-secondary small">
        Search for a user or start a new conversation to get chatting.
      </p>
    </div>
  );
};

export default NoChatsFound;
