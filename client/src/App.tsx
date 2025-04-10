import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AiOutlineSend } from "react-icons/ai";

const socket = io("http://localhost:3001");

type ChatMessage = {
  from: string;
  message: string;
  timestamp: string;
};

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ [userId: string]: ChatMessage[] }>({});
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [user, setUser] = useState<string>();
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  let typingTimeout: NodeJS.Timeout;

  useEffect(() => {
    socket.on('message', (data: ChatMessage) => {
      const from = data.from;

      setMessages((prev) => {
        const updated = { ...prev };
        if (!updated[from]) updated[from] = [];
        updated[from].push(data);
        return updated;
      });
    });

    socket.on('activeUsers', (users: string[]) => {
      setActiveUsers(users);
    });

    socket.on('user', (userId: string) => {
      setUser(userId);
    });

    socket.on('typing', (fromId: string) => {
      setTypingUsers((prev) => [...new Set([...prev, fromId])]);
    });

    socket.on('stopTyping', (fromId: string) => {
      setTypingUsers((prev) => prev.filter((id) => id !== fromId));
    });

    return () => {
      socket.off("message");
      socket.off("activeUsers");
      socket.off("user");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && selectedUser && user) {
      const newMessage: ChatMessage = {
        from: user,
        message,
        timestamp: new Date().toISOString(),
      };

      socket.emit('sendPrivateMessage', selectedUser, message);
      socket.emit('stopTyping', selectedUser); // yazma durumu dursun

      setMessages((prev) => {
        const updated = { ...prev };
        if (!updated[selectedUser]) updated[selectedUser] = [];
        updated[selectedUser].push(newMessage);
        return updated;
      });

      setMessage('');
    }
  };

  const handleTyping = () => {
    if (selectedUser) {
      socket.emit("typing", selectedUser);

      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        socket.emit("stopTyping", selectedUser);
      }, 1000);
    }
  };

  return (
    <div className="flex justify-between items-start h-screen">
      {/* Kullanıcı Listesi */}
      <div className="w-80 h-full border-r border-gray-300 bg-white overflow-auto shadow-md">
        <ul className="space-y-3">
          {activeUsers.map((u, index) => (
            <li
              key={index}
              className={`px-4 py-4 text-lg cursor-pointer hover:bg-gray-100 rounded-md transition-all ${
                selectedUser === u ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedUser(u)}
            >
              {u === user ? "Me" : u}
            </li>
          ))}
        </ul>
      </div>

      {/* Sohbet Alanı */}
      <div className="w-full h-full bg-gray-50 flex flex-col justify-between relative">
        {selectedUser ? (
          <div className="flex flex-col h-full">
            {/* Başlık */}
            <header className="shadow-sm w-full h-20 flex items-center justify-start p-6 absolute top-0 left-0 bg-white gap-2">
              <div className="h-10 w-10 bg-gray-400 rounded-full"></div>
              <p>Hi! {selectedUser === user ? "Me" : selectedUser}</p>
            </header>

            {/* Mesajlar */}
            <div className="flex flex-col gap-3 px-5 py-24 bg-gray-200 h-full overflow-y-auto">
              {(messages[selectedUser] || []).map((msg, index) => {
                const isMe = msg.from === user;
                const time = new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div
                    key={index}
                    className={`max-w-xs px-4 py-3 rounded-2xl shadow text-sm ${
                      isMe
                        ? 'bg-green-300 self-end text-right'
                        : 'bg-white self-start text-left'
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-xs text-gray-600 mt-1">{time}</p>
                  </div>
                );
              })}

              {/* Typing göstergesi */}
              {typingUsers.includes(selectedUser) && (
                <p className="text-sm text-gray-500 italic self-start">Yazıyor...</p>
              )}
            </div>

            {/* Mesaj Gönderme */}
            <div className="flex w-full gap-3 justify-center items-center p-3 absolute bottom-0 left-0 bg-white">
              <input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleTyping();
                }}
                className="border-1 rounded-2xl py-2 px-3 w-full bg-white"
                placeholder="Bir mesaj yazın"
              />
              <button
                onClick={sendMessage}
                className="text-white bg-green-300 hover:bg-green-400 cursor-pointer p-3.5 rounded-full"
              >
                <AiOutlineSend />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <p className="text-3xl font-bold text-gray-600">
              Birini Seçin ve Mesajlaşmaya Başlayın!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
