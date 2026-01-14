import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center p-4 bg-dark bg-opacity-50 h-100">
      <div className="animate-bounce mb-4">
        <div className="bg-primary bg-opacity-10 p-4 rounded-4">
          <MessageSquare size={64} className="text-primary-custom" />
        </div>
      </div>
      <h2 className="text-light fw-bold mb-2">Welcome to Jarvis Chat</h2>
      <p className="text-secondary text-center" style={{ maxWidth: "400px" }}>
        Select a conversation from the sidebar to start messaging. 
        Connect with friends and colleagues instantly.
      </p>
    </div>
  );
};

export default NoChatSelected;
