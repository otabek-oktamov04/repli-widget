import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Smile } from "lucide-react";

interface Message {
  id: number;
  content: string | { type: "sticker"; emoji: string };
  sender: "user" | "bot";
  timestamp: Date;
}

const emojis = ["😊", "😂", "🤔", "👍", "❤️", "🎉", "🌟", "🔥", "🚀", "💡"];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const sendMessage = (
    content: string | { type: "sticker"; emoji: string }
  ) => {
    const newMessage: Message = {
      id: Date.now(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setIsTyping(true);
    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: Date.now(),
        content: "Thanks for your message! This is a creative demo response.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 2000);
  };

  const handleEmojiClick = (emoji: string) => {
    sendMessage({ type: "sticker", emoji });
    setShowEmojiPicker(false);
  };

  const chatVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={chatVariants}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl w-80 sm:w-96 h-[28rem] flex flex-col overflow-hidden border border-purple-500"
          >
            <div className="bg-gray-800 p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-bold text-purple-400 text-lg">Repli Chat</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
                aria-label="Close chat"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial="hidden"
                  animate="visible"
                  variants={messageVariants}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-3 ${
                      message.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-100"
                    }`}
                  >
                    {typeof message.content === "string" ? (
                      message.content
                    ) : (
                      <span className="text-4xl">{message.content.emoji}</span>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={messageVariants}
                  className="flex justify-start"
                >
                  <div className="bg-gray-700 rounded-full p-3 w-16">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 rounded-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-400"
                  aria-label="Type a message"
                />
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  aria-label="Open emoji picker"
                >
                  <Smile size={24} />
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={24} />
                </button>
              </div>
            </form>
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-16 right-0 bg-gray-800 p-2 rounded-lg shadow-lg"
                >
                  <div className="grid grid-cols-5 gap-2">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiClick(emoji)}
                        className="text-2xl hover:bg-gray-700 p-1 rounded"
                        aria-label={`Send ${emoji} emoji`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </motion.button>
      )}
    </div>
  );
}
