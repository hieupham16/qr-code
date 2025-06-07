import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";

function HeartAnimation() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-300 animate-floating-heart text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
}

function BackgroundMusic() {
  useEffect(() => {
    const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/12/11/audio_a938fb91cd.mp3?filename=romantic-piano-loop-126299.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});
    return () => audio.pause();
  }, []);

  return null;
}

function Home() {
  const [text, setText] = useState("Anh yêu em rất nhiều");
  const [link, setLink] = useState("");

  const generateQR = () => {
    const encoded = encodeURIComponent(text);
    const baseUrl = window.location.hostname === "localhost" 
      ? "http://localhost:5173"
      : "https://qr-code-iota-rouge.vercel.app";
    const url = `${baseUrl}/love?text=${encoded}`;
    setLink(url);
  };

  const downloadQR = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "love-qr-code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-200 to-rose-300 font-dancing flex flex-col items-center justify-center px-6 py-10">
      <BackgroundMusic />
      <HeartAnimation />
      <h1 className="z-10 text-6xl font-extrabold text-rose-700 drop-shadow mb-6 animate-fade-in">💖 Tạo QR Tình Yêu 💖</h1>
      <p className="z-10 text-lg text-rose-900 mb-8 text-center max-w-xl animate-fade-in-slow">
        Hãy gửi những lời yêu thương ngọt ngào của bạn dưới dạng mã QR đặc biệt dành riêng cho người ấy 💌
      </p>
      <div className="z-10 w-full max-w-xl bg-white shadow-2xl rounded-3xl p-6 flex flex-col gap-4 animate-fade-in border border-rose-300">
        <textarea
          className="border border-pink-200 rounded-xl p-4 w-full text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập lời yêu thương..."
        />
        <button
          onClick={generateQR}
          className="bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-full font-semibold shadow-md hover:scale-105 transition transform duration-300"
        >
          ❤️ Tạo mã QR ngay
        </button>
      </div>

      {link && (
        <div className="z-10 mt-10 flex flex-col items-center gap-4 animate-fade-in">
          <QRCodeCanvas value={link} size={220} className="shadow-lg rounded-lg" />
          <p className="text-blue-700 text-center break-words text-sm max-w-xs underline">{link}</p>
          <button
            onClick={downloadQR}
            className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 px-6 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition transform duration-300 flex items-center gap-2"
          >
            <span>💾</span> Tải mã QR về máy
          </button>
        </div>
      )}
    </div>
  );
}

function LovePage() {
  const [searchParams] = useSearchParams();
  const text = searchParams.get("text") || "Anh yêu em";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-100 via-pink-200 to-pink-300 flex items-center justify-center font-dancing p-6">
      <BackgroundMusic />
      <HeartAnimation />
      <div className="z-10 bg-white rounded-3xl shadow-2xl p-10 max-w-2xl text-center border-4 border-rose-200 animate-fade-in">
        <img src="https://cdn-icons-png.flaticon.com/512/803/803087.png" alt="Love Logo" className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-5xl sm:text-6xl font-extrabold text-rose-600 leading-tight drop-shadow-md mb-6">
          {text}
        </h1>
        <p className="text-xl text-rose-500">(Gửi từ một trái tim yêu thương 💞)</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/love" element={<LovePage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
} 
