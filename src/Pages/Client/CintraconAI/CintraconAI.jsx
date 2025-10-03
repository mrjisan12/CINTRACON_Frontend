import React, { useRef, useState } from "react";
import NavbarMain from "../../../Ui/NavbarMain";
import LeftSideBar from "../../../Components/LeftSideBar";

const initialMessages = [
  { sender: "ai", text: "Hi! I'm CINTRACON AI. How can I help you today?" },
];

const CintraconAI = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "ai", text: "CINTRACON is under developing, Please wait few Days" }, // Placeholder
    ]);
    setInput("");
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181820] via-[#1e2240] to-[#232A36]">
      <NavbarMain />
      <div className="max-w-7xl mx-auto px-2 md:px-6 pt-6 flex gap-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-1/4">
          <LeftSideBar />
        </div>
        {/* Chat Content */}
  <div className="max-w-3xl mx-auto flex flex-col rounded-3xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-[#2A2D3A] relative" style={{height: '600px'}}>
          {/* Glassmorphism Glow */}
          <div className="absolute -inset-2 z-0 rounded-3xl pointer-events-none bg-gradient-to-br from-blue-600/30 via-purple-500/20 to-cyan-400/20 blur-2xl opacity-60" />
          {/* Chat Header */}
          <div className="sticky top-0 z-20 px-8 py-5 border-b border-[#232A36] bg-gradient-to-r from-[#2e3a6a] via-[#3a2e6a] to-[#1e2240] flex items-center gap-4 shadow-lg">
            <img src="/logo.png" alt="AI" className="w-12 h-12 rounded-full bg-black p-1 shadow-lg" />
            <div>
              <div className="text-white font-extrabold text-2xl tracking-wide drop-shadow">CINTRACON AI</div>
              <div className="text-cyan-200 text-xs font-medium tracking-wide">Your smart study assistant</div>
            </div>
          </div>
          {/* Chat Messages */}
          <div className="relative z-10 flex-1 overflow-y-auto px-8 py-6 space-y-6 bg-transparent" style={{ scrollbarWidth: 'thin', height: 'calc(600px - 90px - 80px)' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-5 py-3 rounded-2xl text-base font-medium shadow-lg transition-all
                    ${msg.sender === "user"
                      ? "bg-gradient-to-br from-[#3a8dde] via-[#5f5fff] to-[#7f53ac] text-white rounded-br-3xl border-2 border-blue-400/30"
                      : "bg-gradient-to-br from-[#232A36]/80 via-[#2e3a6a]/80 to-[#1e2240]/80 text-cyan-100 rounded-bl-3xl border-2 border-purple-400/20 backdrop-blur-sm"}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Chat Input */}
          <form onSubmit={handleSend} className="sticky bottom-0 left-0 right-0 z-20 flex items-center gap-3 px-8 py-5 border-t border-[#232A36] bg-gradient-to-r from-[#232A36]/80 to-[#1e2240]/80 backdrop-blur-xl rounded-b-3xl">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full px-6 py-3 bg-white/20 text-white placeholder-cyan-200 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-inner border border-[#2A2D3A]/40"
            />
            <button
              type="submit"
              className="bg-white hover:bg-black text-black hover:text-white font-bold px-7 py-3 rounded-full shadow-lg hover:from-cyan-300 hover:to-purple-700 transition-all border-2 border-white/10"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CintraconAI;