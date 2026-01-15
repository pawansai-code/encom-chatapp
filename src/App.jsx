import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { socket } from './lib/socket';
import { checkAuth } from './store/authSlice';
import { addMessage, setOnlineUsers, setTypingUser } from './store/chatSlice';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ChatContainer from './components/Chat/ChatContainer';
import ChatsList from './components/Chat/ChatsList';
import Navbar from './components/UI/Navbar';
import PageLoader from './components/UI/PageLoader';

const Home = () => {
    return (
        <div className="flex-grow-1 d-flex overflow-hidden px-4 pb-4 pt-4">
            <div className="d-flex w-100 h-100 rounded-4 glass-effect overflow-hidden shadow-lg border border-white border-opacity-10">
                <ChatsList />
                <ChatContainer />
            </div>
        </div>
    );
};

const App = () => {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Socket Connection Effect
  useEffect(() => {
    if (authUser) {
      socket.io.opts.query = { // Pass userId for socket auth if backend requires it
        userId: authUser._id 
      };
      
      socket.connect();

      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      socket.on("newMessage", (message) => {
          // Play sound if needed
          const audio = new Audio("/sounds/notification.mp3"); // Assuming file exists or fails gracefully
          audio.play().catch(e => {}); 
          
          dispatch(addMessage(message));
      });

      socket.on("typing", ({ senderId }) => {
          dispatch(setTypingUser({ userId: senderId, isTyping: true }));
      });

      socket.on("stopTyping", ({ senderId }) => {
          dispatch(setTypingUser({ userId: senderId, isTyping: false }));
      });


      return () => {
        socket.off("getOnlineUsers");
        socket.off("newMessage");
        socket.off("typing");
        socket.off("stopTyping");
        socket.disconnect();
      };
    } else {
        socket.disconnect();
    }
  }, [authUser, dispatch]);


  if (isCheckingAuth && !authUser) return <PageLoader />;
  
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      
      <Routes>
        <Route 
            path="/" 
            element={authUser ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
            path="/signup" 
            element={!authUser ? <Signup /> : <Navigate to="/" />} 
        />
        <Route 
            path="/login" 
            element={!authUser ? <Login /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
};

export default App;