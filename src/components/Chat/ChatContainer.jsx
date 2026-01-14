import { format } from "date-fns"; // We'll need to install date-fns
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../store/chatSlice";
import MessagesLoadingSkeleton from "../UI/MessagesLoadingSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";

const ChatContainer = () => {
    const dispatch = useDispatch();
    const { messages, selectedUser, isMessagesLoading } = useSelector((state) => state.chat);
    const { authUser } = useSelector((state) => state.auth);
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(getMessages(selectedUser._id));
            
            // Join a room logic could be here if using rooms, but standard socket per user works too.
            // For now, we rely on the global listener in App.jsx or similar, but
            // actually it's better to subscribe to updates here or globally.
            // If we do it globally, we just push to store.
        }
    }, [selectedUser?._id, dispatch]);

    useEffect(() => {
       if(messageEndRef.current && messages) {
           messageEndRef.current.scrollIntoView({ behavior: "smooth" });
       }
    }, [messages]);


    if (!selectedUser) return <NoChatSelected />;

    if (isMessagesLoading) {
        return (
            <div className="d-flex flex-column h-100 flex-grow-1 overflow-hidden">
                <ChatHeader />
                <MessagesLoadingSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column h-100 flex-grow-1 overflow-hidden">
            <ChatHeader />

            <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3">
                {messages.map((message) => {
                    const isFromMe = message.senderId === authUser._id;
                    return (
                        <div
                            key={message._id}
                            className={`d-flex ${isFromMe ? "justify-content-end" : "justify-content-start"}`}
                            ref={messageEndRef}
                        >
                            <div className={`d-flex flex-column gap-1 ${isFromMe ? "align-items-end" : "align-items-start"}`} style={{ maxWidth: "70%" }}>
                                <div className="d-flex align-items-end gap-2">
                                     {!isFromMe && (
                                         <img
                                            src={selectedUser.profilePic || "https://avatar.iran.liara.run/public/boy"}
                                            alt="profile"
                                            className="rounded-circle object-fit-cover border border-secondary"
                                            style={{ width: "28px", height: "28px" }}
                                         />
                                     )}
                                     
                                     <div className={`p-3 rounded-4 ${
                                         isFromMe 
                                         ? "bg-primary text-light rounded-br-0" 
                                         : "bg-dark shadow-sm border border-secondary border-opacity-25 text-light rounded-bl-0"
                                     }`}>
                                         {message.image && (
                                             <img 
                                                src={message.image} 
                                                alt="Attachment" 
                                                className="img-fluid rounded mb-2 border border-secondary border-opacity-25"
                                                style={{maxHeight: "200px"}}
                                             />
                                         )}
                                         {message.text && <p className="mb-0">{message.text}</p>}
                                     </div>
                                </div>
                                <span className="text-secondary small opacity-75 ms-1">
                                    {format(new Date(message.createdAt), "p")}
                                </span>
                            </div>
                        </div>
                    );
                })}
                 <div ref={messageEndRef} />
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
