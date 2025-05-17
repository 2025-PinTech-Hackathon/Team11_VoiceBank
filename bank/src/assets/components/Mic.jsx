import React, { useEffect, useRef, useState } from "react";

export default function Mic() {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");
  const btnRef = useRef();

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      if (btnRef.current) btnRef.current.disabled = true;
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      transcriptRef.current = "";
      setIsRecording(true);
    };
    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcriptRef.current += event.results[i][0].transcript;
      }
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => {
      setIsRecording(false);
      const userSpeech = transcriptRef.current.trim();
      if (!userSpeech) return;
      window.speechSynthesis.cancel();
      fetch("http://localhost:3000/askgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userSpeech }),
      })
        .then((r) => r.json())
        .then((data) => {
          let answer = data.answer || "응답이 없습니다.";
          const moveMatch = answer.match(/페이지 이동: (home\.html|benefit\.html|pay\.html|money\.html|paper\.html)/);
          if (moveMatch) {
            window.location.href = moveMatch[1];
          } else {
            const tts = new window.SpeechSynthesisUtterance(answer);
            tts.lang = "ko-KR";
            window.speechSynthesis.speak(tts);
          }
        });
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  const onMicClick = () => {
    window.speechSynthesis.cancel();
    if (!isRecording) {
      recognitionRef.current && recognitionRef.current.start();
    } else {
      recognitionRef.current && recognitionRef.current.stop();
    }
  };

  return (
    <button
      ref={btnRef}
      className="fixed left-1/2 bottom-12 -translate-x-1/2 z-30 w-64 h-16 bg-gray-100 rounded-full shadow-lg flex items-center justify-center border-none transition text-[2.4rem] active:scale-95"
      id="voice-btn"
      title="음성 질문"
      onClick={onMicClick}
    >
      <span className="text-4xl">🎙️</span>
    </button>
  );
}
