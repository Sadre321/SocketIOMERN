import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AiOutlineSend } from "react-icons/ai";

const socket = io("http://localhost:3001");

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (data: string) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
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
      {/* <div className=" bg-green-300  px-3 py-5 text-sm rounded-3xl">
      sad;laskd;laskl;dk;ksadasjdhashdk
    </div>
    <div className=" shadow px-3 py-5 text-sm rounded-3xl">
      sad;laskd;laskl;dk;ksadasjdhashdk
    </div> */}
      {/* sohbet alani */}
      {/* <div className="flex flex-col justify-center items-center gap-3">
          {messages.map((msg, index) => (
            <div className=" bg-green-300  px-3 py-5 text-sm rounded-3xl" key={index}>
              {msg}
            </div>
          ))}
        </div> */}
      {/* <main className="flex flex-col justify-center items-center gap-2">
        <header className="shadow-sm w-full h-20 flex items-center justify-center">
          EFE
        </header>
        <div className="flex flex-col justify-center items-center gap-3 w-full">
          {messages.map((msg, index) => (
            <div
              className={`px-3 py-5 text-sm rounded-3xl ${index % 2 === 0 ? 'bg-green-300 self-start' : 'bg-blue-300 self-end'}`}
              key={index}
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="flex w-full gap-3 justify-center items-center">
          <input type="text" value={message}
            onChange={(e) => setMessage(e.target.value)} className="border-1 rounded-2xl py-2 px-3 w-full" placeholder="Bir mesaj yazin" />
          <button onClick={sendMessage} className="text-white bg-green-300 p-3.5 rounded-full">
            <AiOutlineSend/>
          </button>
        </div>
      </main> */}
      <main className="flex flex-col justify-between items-center gap-2 h-screen">
        <header className="shadow-sm w-full h-20 flex items-center justify-start p-6 fixed absolute top-0 left-0 bg-white gap-2">
          <div className="h-10 w-10 bg-gray-400 rounded-full"></div>
          <p>
            EFE
          </p>
        </header>

        {/* Sohbet Alanı */}
        <div className="flex flex-col justify-center items-center gap-3 w-full py-5 px-3">
          {messages.map((msg, index) => (
            <div
              className={`px-3 py-5 text-sm rounded-3xl ${index % 2 === 0 ? 'bg-green-300 self-start' : 'bg-blue-300 self-end'}`}
              key={index}
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Input Alanı */}
        <div className="flex w-full gap-3 justify-center items-center p-3 fixed absolute bottom-0 left-0 ">
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
      </main>

    </>
  )
}

export default App
