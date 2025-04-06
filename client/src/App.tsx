import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AiOutlineSend } from "react-icons/ai";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [activeUsers,setActiveUsers] = useState<string[]>([]);
  const [selectedUser,setSelectedUser] = useState<string>("");

  console.log(selectedUser);

  useEffect(() => {
    socket.on('message', (data: string) => {
      setMessages((prev) => [...prev, data]);
    });

     // Aktif kullanıcıları dinleme
     socket.on('activeUsers', (users: string[]) => {
      setActiveUsers(users); // Bu şekilde doğru tip ile alacağız
    });

    return () => {
      socket.off("message");
      socket.off("activeUsers");
    }
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message); // Mesajı sunucuya gönderiyoruz
      setMessage(''); // Mesaj gönderildikten sonra input'u temizliyoruz
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="h-screen w-3xs z-10 border-r-1 rounded-md overflow-auto">
        <ul className="space-y-2">
            {activeUsers.map((user, index) => (
              <li key={index} className="px-3 py-5 text-lg shadow" onClick={()=>{
                setSelectedUser(user);
              }}>{user}</li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <section className="flex flex-col justify-between items-center gap-2 h-screen relative">
            <header className="shadow-sm w-full h-20 flex items-center justify-start p-6 absolute top-0 left-0 bg-white gap-2">
              <div className="h-10 w-10 bg-gray-400 rounded-full"></div>
              <p>
                Hi! {selectedUser}
              </p>
            </header>

            {/* Sohbet Alanı */}
            <div className="flex flex-col justify-center items-center gap-3 w-full py-5 px-3 bg-gray-200 h-screen">
              {messages.map((msg, index) => (
                <div
                  className={`px-3 py-5 text-sm rounded-3xl ${index % 2 === 0 ? 'bg-green-300 shadow self-start' : 'shadow bg-white self-end'}`}
                  key={index}
                >
                  {msg}
                </div>
              ))}
            </div>

            {/* Input Alanı */}
            <div className="flex w-full gap-3 justify-center items-center p-3 absolute bottom-0 left-0 ">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-1 rounded-2xl py-2 px-3 w-full bg-white"
                placeholder="Bir mesaj yazin"
              />
              <button onClick={sendMessage} className="text-white bg-green-300 p-3.5 rounded-full">
                <AiOutlineSend />
              </button>
            </div>
          </section>
        </div>
      </div>

    </>
  )
}

export default App
