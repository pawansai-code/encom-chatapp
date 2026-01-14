import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/axios";

// MOCK DATA for Demo Purposes
const MOCK_USERS = [
    { _id: "user-1", fullName: "Alice Johnson", email: "alice@example.com", profilePic: "https://avatar.iran.liara.run/public/girl" },
    { _id: "user-2", fullName: "Bob Smith", email: "bob@example.com", profilePic: "https://avatar.iran.liara.run/public/boy" },
    { _id: "user-3", fullName: "Charlie Brown", email: "charlie@example.com", profilePic: "https://avatar.iran.liara.run/public/boy?username=charlie" },
];

const MOCK_MESSAGES = [
    { _id: "msg-1", senderId: "user-1", receiverId: "demo-user-001", text: "Hey there! This is a demo message.", createdAt: new Date(Date.now() - 100000).toISOString() },
    { _id: "msg-2", senderId: "demo-user-001", receiverId: "user-1", text: "Hi Alice! The UI looks great.", createdAt: new Date(Date.now() - 50000).toISOString() },
    { _id: "msg-3", senderId: "user-1", receiverId: "demo-user-001", text: "Glad you like it!", createdAt: new Date().toISOString() },
];

export const getUsers = createAsyncThunk("chat/getUsers", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/messages/users");
        return data;
    } catch (error) {
        if (!error.response) return MOCK_USERS;
        return rejectWithValue(error.response?.data?.message || "Error fetching users");
    }
});

export const getMessages = createAsyncThunk("chat/getMessages", async (userId, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/messages/${userId}`);
        return data;
    } catch (error) {
        if (!error.response) return MOCK_MESSAGES.filter(m => m.senderId === userId || m.receiverId === userId);
        return rejectWithValue(error.response?.data?.message || "Error fetching messages");
    }
});

export const sendMessage = createAsyncThunk("chat/sendMessage", async ({ text, image }, { getState, rejectWithValue }) => {
    const { selectedUser } = getState().chat;
    try {
        const { data } = await api.post(`/messages/send/${selectedUser._id}`, { text, image });
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Error sending message");
    }
});

const initialState = {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    onlineUsers: [], // Array of userIds
    typingUsers: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setTypingUser: (state, action) => {
            const { userId, isTyping } = action.payload;
            if (isTyping) {
                if (!state.typingUsers.includes(userId)) state.typingUsers.push(userId);
            } else {
                state.typingUsers = state.typingUsers.filter(id => id !== userId);
            }
        },
        addMessage: (state, action) => {
            // Only add message if it belongs to current conversation
            const newMessage = action.payload;
            if (state.selectedUser && (newMessage.senderId === state.selectedUser._id || newMessage.receiverId === state.selectedUser._id)) {
                state.messages.push(newMessage);
            }
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isUsersLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isUsersLoading = false;
            })
            .addCase(getUsers.rejected, (state) => {
                state.isUsersLoading = false;
            })
            .addCase(getMessages.pending, (state) => {
                state.isMessagesLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.isMessagesLoading = false;
            })
            .addCase(getMessages.rejected, (state) => {
                state.isMessagesLoading = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            });
    },
});

export const { setSelectedUser, setOnlineUsers, setTypingUser, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
