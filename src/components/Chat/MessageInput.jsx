import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useKeyboardSound from "../../hooks/useKeyboardSound";
import { socket } from "../../lib/socket";
import { sendMessage } from "../../store/chatSlice";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(state => state.chat);
    const [isSending, setIsSending] = useState(false);
    
    // Typing indicator logic
    const typingTimeoutRef = useRef(null);
    const playSound = useKeyboardSound();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleInput = (e) => {
        setText(e.target.value);
        
        // Play keyboard sound
        playSound();

        // Emit typing event
        if (selectedUser?._id) {
             socket.emit("typing", { receiverId: selectedUser._id });
             
             // Clear existing timeout
             if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
             
             // Set new timeout to stop typing after 2 seconds of inactivity
             typingTimeoutRef.current = setTimeout(() => {
                 socket.emit("stopTyping", { receiverId: selectedUser._id });
             }, 2000);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        
        // Stop typing immediately
        if (selectedUser?._id) {
            socket.emit("stopTyping", { receiverId: selectedUser._id });
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        }

        setIsSending(true);
        try {
            await dispatch(sendMessage({
                text: text.trim(),
                image: imagePreview,
            }));
            
            // Clear input on success
            setText("");
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="p-3 w-100 border-top border-secondary border-opacity-25 bg-dark bg-opacity-25 backdrop-blur-sm">
            {imagePreview && (
                <div className="mb-3 d-flex align-items-center gap-2">
                    <div className="position-relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="rounded border border-secondary"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                        <button
                            onClick={removeImage}
                            className="position-absolute top-0 end-0 translate-middle btn btn-sm btn-dark rounded-circle p-0 d-flex align-items-center justify-content-center"
                            style={{ width: "20px", height: "20px" }}
                            type="button"
                        >
                            <X size={12} />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
                <div className="flex-grow-1 position-relative">
                  <input
                    type="text"
                    className="form-control rounded-pill input-glass py-2 px-4" 
                    placeholder="Type a message..."
                    value={text}
                    onChange={handleInput}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="d-none"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    className={`position-absolute top-50 end-0 translate-middle-y btn btn-link text-secondary me-2 ${imagePreview ? "text-success" : ""}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image size={20} />
                  </button>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "45px", height: "45px", backgroundColor: "var(--primary)" }}
                  disabled={!text.trim() && !imagePreview}
                >
                  <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
