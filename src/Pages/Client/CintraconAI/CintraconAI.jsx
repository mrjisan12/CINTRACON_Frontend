import React, { useRef, useState, useEffect } from "react";
import NavbarMain from "../../../Ui/NavbarMain";
import LeftSideBar from "../../../Components/LeftSideBar";
import { 
  sendChatMessage, 
  getChatSessions, 
  createChatSession, 
  deleteChatSession,
  getChatSessionDetail 
} from "../../../api/chatApi";
import { toast } from 'react-toastify';

const CintraconAI = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm CINTRACON AI. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showSessions, setShowSessions] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat sessions on component mount
  useEffect(() => {
    loadChatSessions();
  }, []);

  const loadChatSessions = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const sessionsData = await getChatSessions(token);
      setSessions(sessionsData);
      
      if (sessionsData.length > 0) {
        // Auto-select the latest session
        const latestSession = sessionsData[0];
        setCurrentSession(latestSession.id);
        await loadSessionMessages(latestSession.id, token);
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      toast.error('Failed to load chat sessions');
    }
  };

  const loadSessionMessages = async (sessionId, token) => {
    try {
      const sessionData = await getChatSessionDetail(sessionId, token);
      if (sessionData.messages && sessionData.messages.length > 0) {
        const formattedMessages = sessionData.messages.map(msg => ({
          sender: msg.is_user ? "user" : "ai",
          text: msg.message,
          timestamp: new Date(msg.created_at)
        }));
        setMessages(formattedMessages);
      } else {
        // Reset to welcome message if no messages
        setMessages([
          { sender: "ai", text: "Hi! I'm CINTRACON AI. How can I help you today?" },
        ]);
      }
    } catch (error) {
      console.error('Error loading session messages:', error);
      toast.error('Failed to load chat history');
    }
  };

  const handleCreateNewSession = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const newSession = await createChatSession(token);
      setSessions(prev => [newSession, ...prev]);
      setCurrentSession(newSession.id);
      setMessages([
        { sender: "ai", text: "Hi! I'm CINTRACON AI. How can I help you today?" },
      ]);
      setShowSessions(false);
      toast.success('New chat session created');
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('Failed to create new session');
    }
  };

  const handleDeleteSession = async (sessionId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('accessToken');
      await deleteChatSession(sessionId, token);
      
      setSessions(prev => prev.filter(session => session.id !== sessionId));
      
      // If current session is deleted
      if (currentSession === sessionId) {
        if (sessions.length > 1) {
          // Switch to next available session
          const remainingSessions = sessions.filter(session => session.id !== sessionId);
          const nextSession = remainingSessions[0];
          setCurrentSession(nextSession.id);
          await loadSessionMessages(nextSession.id, token);
        } else {
          // No sessions left
          setCurrentSession(null);
          setMessages([
            { sender: "ai", text: "Hi! I'm CINTRACON AI. How can I help you today?" },
          ]);
        }
      }
      
      toast.success('Chat session deleted');
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error('Failed to delete session');
    }
  };

  const handleSessionSelect = async (sessionId) => {
    try {
      const token = localStorage.getItem('accessToken');
      setCurrentSession(sessionId);
      await loadSessionMessages(sessionId, token);
      setShowSessions(false);
    } catch (error) {
      console.error('Error selecting session:', error);
      toast.error('Failed to load session');
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setInput("");
    
    // Add user message immediately
    const userMessageObj = { 
      sender: "user", 
      text: userMessage, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessageObj]);

    setIsLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await sendChatMessage(userMessage, currentSession, token);
      
      // Update session if new one was created
      if (response.session_id && !currentSession) {
        setCurrentSession(response.session_id);
        await loadChatSessions(); // Reload sessions list
      }
      
      // Add AI response
      const aiMessageObj = { 
        sender: "ai", 
        text: response.ai_message.message, 
        timestamp: new Date(response.ai_message.created_at) 
      };
      setMessages(prev => [...prev, aiMessageObj]);

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
      
      // Add error message
      const errorMessageObj = { 
        sender: "ai", 
        text: "Sorry, I'm having trouble responding right now. Please try again later.", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f1f] to-[#1a1a2e] relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <NavbarMain />
      
      <div className="max-w-7xl mx-auto px-2 md:px-6 pt-6 flex gap-6 relative z-10">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-1/4">
          <LeftSideBar />
        </div>

        {/* Main Chat Container */}
        <div className="flex-1 max-w-4xl mx-auto">
          {/* Sessions Sidebar */}
          {showSessions && (
            <div className="mb-4 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Chat Sessions</h3>
                <button
                  onClick={handleCreateNewSession}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full text-sm font-bold hover:scale-105 transition-all"
                >
                  + New Chat
                </button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {sessions.map(session => (
                  <div
                    key={session.id}
                    onClick={() => handleSessionSelect(session.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all hover:bg-white/10 ${
                      currentSession === session.id ? 'bg-cyan-500/20 border border-cyan-400/30' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          Chat {session.id}
                        </p>
                        <p className="text-cyan-200/60 text-xs">
                          {formatDate(session.created_at)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteSession(session.id, e)}
                        className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-500/20 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                {sessions.length === 0 && (
                  <p className="text-cyan-200/60 text-center py-4">No chat sessions yet</p>
                )}
              </div>
            </div>
          )}

          {/* Chat Container */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl" style={{height: '700px'}}>
            
            {/* Animated Glow Effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 via-purple-600/30 to-blue-600/20 rounded-3xl blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 via-purple-400/15 to-blue-400/10 rounded-3xl blur-2xl opacity-50 animate-pulse delay-1000"></div>
            
            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col bg-gradient-to-br from-black/80 via-[#0a0a1a]/90 to-[#1a1a2e]/80 backdrop-blur-3xl">
              
              {/* Chat Header */}
              <div className="relative px-8 py-6 border-b border-white/10 bg-gradient-to-r from-black/60 via-purple-900/30 to-cyan-900/20 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Animated AI Avatar */}
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                      <img 
                        src="/logo.png" 
                        alt="CINTRACON AI" 
                        className="relative w-14 h-14 rounded-full bg-black p-1 border-2 border-cyan-400/50 shadow-2xl"
                      />
                      {/* Online Status Indicator */}
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-black shadow-lg animate-ping"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                    </div>
                    
                    <div className="flex-1">
                      <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text drop-shadow-2xl">
                        CINTRACON AI
                      </h1>
                      <p className="text-cyan-200/80 text-sm font-medium tracking-wider mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        {currentSession ? `Session ${currentSession} • ` : "New Session • "}
                        Always online
                      </p>
                    </div>
                  </div>

                  {/* Session Management Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCreateNewSession}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full text-sm font-bold hover:scale-105 transition-all shadow-lg"
                    >
                      New Chat
                    </button>
                    <button
                      onClick={() => setShowSessions(!showSessions)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div 
                className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-gradient-to-b from-transparent to-black/20"
                style={{ scrollbarWidth: 'thin', height: 'calc(700px - 120px - 100px)' }}
              >
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                  >
                    <div className="relative group">
                      {/* Message Glow Effect */}
                      <div className={`absolute -inset-1 rounded-2xl blur opacity-30 transition-all duration-300 group-hover:opacity-50
                        ${msg.sender === "user" 
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500" 
                          : "bg-gradient-to-r from-purple-500 to-cyan-500"}`}
                      ></div>
                      
                      {/* Message Bubble */}
                      <div
                        className={`relative max-w-[80%] px-6 py-4 rounded-2xl text-lg font-medium shadow-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-105
                          ${msg.sender === "user"
                            ? "bg-gradient-to-br from-cyan-600/90 via-blue-600/90 to-purple-600/90 text-white border-cyan-400/30 rounded-br-md"
                            : "bg-gradient-to-br from-purple-600/80 via-gray-900/90 to-cyan-600/80 text-cyan-50 border-purple-400/20 rounded-bl-md"}
                        `}
                      >
                        {/* Message Text */}
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        
                        {/* Message Time */}
                        <div className={`text-xs opacity-60 mt-2 ${msg.sender === "user" ? 'text-cyan-100' : 'text-purple-100'}`}>
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="relative group">
                      <div className="absolute -inset-1 rounded-2xl blur opacity-30 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
                      <div className="relative max-w-[80%] px-6 py-4 rounded-2xl bg-gradient-to-br from-purple-600/80 via-gray-900/90 to-cyan-600/80 text-cyan-50 border border-purple-400/20 backdrop-blur-xl">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-cyan-200">CINTRACON AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Area */}
              <div className="relative border-t border-white/10 bg-gradient-to-r from-black/50 via-purple-900/20 to-cyan-900/20 backdrop-blur-2xl">
                {/* Input Glow */}
                <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-cyan-400/50 blur-sm"></div>
                
                <form onSubmit={handleSend} className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    {/* Input with Glow */}
                    <div className="flex-1 relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 rounded-2xl blur-sm opacity-50"></div>
                      <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask me anything about your studies... 📚"
                        disabled={isLoading}
                        className="relative w-full rounded-2xl px-6 py-4 bg-black/60 text-white placeholder-cyan-200/70 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/50 border border-cyan-400/20 shadow-inner backdrop-blur-xl transition-all duration-300 disabled:opacity-50"
                      />
                    </div>
                    
                    {/* Send Button with Glow */}
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="relative group disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-full shadow-2xl border border-cyan-400/30 backdrop-blur-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-cyan-500/25">
                        <span className="flex items-center gap-2">
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          )}
                          {isLoading ? "Sending..." : "Send"}
                        </span>
                      </div>
                    </button>
                  </div>
                  
                  {/* Quick Suggestions */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Explain programming", "Math help", "Study tips", "Project ideas"].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-cyan-200/80 hover:text-cyan-100 text-sm font-medium border border-cyan-400/20 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-400/40 disabled:opacity-40"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for smooth animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CintraconAI;