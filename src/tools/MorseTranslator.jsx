import React, { useState } from 'react';

export default function MorseTranslator() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState("text-to-morse"); 
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // قاموس شفرة مورس العالمي (للحروف الإنجليزية والأرقام)
  const textToMorseMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/' // بنستخدم السلاش للفصل بين الكلمات
  };

  // قاموس عكسي لفك الشفرة
  const morseToTextMap = Object.keys(textToMorseMap).reduce((acc, key) => {
    acc[textToMorseMap[key]] = key;
    return acc;
  }, {});

  const translate = (text, currentMode) => {
    if (!text) return "";
    
    if (currentMode === "text-to-morse") {
      return text.toUpperCase().split('').map(char => textToMorseMap[char] || char).join(' ');
    } else {
      // بنفك الشفرة عن طريق تقسيم المسافات
      return text.split(' ').map(char => morseToTextMap[char] || char).join('').toLowerCase();
    }
  };

  const resultText = translate(inputText, mode);

  // دالة تشغيل الصوت (التلغراف)
  const playAudio = async () => {
    if (!resultText || mode !== "text-to-morse" || isPlaying) return;
    setIsPlaying(true);
    
    // إنشاء سياق صوتي في المتصفح
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const dotLength = 70; // سرعة النقطة بالمللي ثانية

    const playBeep = (duration) => {
      return new Promise(resolve => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine'; // نوع الموجة الصوتية
        oscillator.frequency.value = 600; // تردد الصوت (حدة التيت)
        
        // تدرج صوتي لمنع الطقطقة في السماعة
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
        gainNode.gain.setValueAtTime(1, audioCtx.currentTime + duration / 1000 - 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration / 1000);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + duration / 1000);
        
        setTimeout(resolve, duration);
      });
    };

    // قراءة الشفرة وتشغيل الصوت بالترتيب
    for (let char of resultText) {
      if (char === '.') {
        await playBeep(dotLength);
        await new Promise(r => setTimeout(r, dotLength)); // مسافة بين الرموز
      } else if (char === '-') {
        await playBeep(dotLength * 3);
        await new Promise(r => setTimeout(r, dotLength));
      } else if (char === ' ') {
        await new Promise(r => setTimeout(r, dotLength * 3)); // مسافة بين الحروف
      } else if (char === '/') {
        await new Promise(r => setTimeout(r, dotLength * 7)); // مسافة بين الكلمات
      }
    }
    
    setIsPlaying(false);
  };

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', width: '100%', maxWidth: '600px', border: '1px solid #334155' }}>
      <h2 style={{ textAlign: 'center', color: '#f8fafc', marginBottom: '30px', fontSize: '24px' }}>Morse Code Translator 📻</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setMode("text-to-morse")} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${mode === "text-to-morse" ? '#3b82f6' : '#334155'}`, backgroundColor: mode === "text-to-morse" ? '#3b82f6' : 'transparent', color: mode === "text-to-morse" ? '#fff' : '#94a3b8', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: mode === "text-to-morse" ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none' }}>
          Text to Morse
        </button>
        <button onClick={() => setMode("morse-to-text")} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${mode === "morse-to-text" ? '#10b981' : '#334155'}`, backgroundColor: mode === "morse-to-text" ? '#10b981' : 'transparent', color: mode === "morse-to-text" ? '#fff' : '#94a3b8', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: mode === "morse-to-text" ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none' }}>
          Morse to Text
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>Input:</label>
        <textarea 
          placeholder={mode === "text-to-morse" ? "Type English text here..." : "Type Morse code (e.g. ... --- ...)"}
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          style={{ width: '100%', height: '100px', padding: '15px', fontSize: '16px', backgroundColor: '#0f172a', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', outline: 'none', boxSizing: 'border-box', resize: 'none' }} 
        />
      </div>

      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4 style={{ margin: '0', color: '#94a3b8' }}>Result:</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            {mode === "text-to-morse" && (
              <button 
                onClick={playAudio}
                disabled={!resultText || isPlaying}
                style={{ padding: '6px 12px', backgroundColor: isPlaying ? '#334155' : '#f59e0b', color: '#fff', border: 'none', borderRadius: '6px', cursor: (!resultText || isPlaying) ? 'not-allowed' : 'pointer', fontSize: '14px', transition: 'background-color 0.3s', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                {isPlaying ? '🔊 Playing...' : '▶️ Play Audio'}
              </button>
            )}
            <button 
              onClick={handleCopy}
              disabled={!resultText}
              style={{ padding: '6px 12px', backgroundColor: copied ? '#10b981' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: resultText ? 'pointer' : 'not-allowed', fontSize: '14px', transition: 'background-color 0.3s', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>

        <p style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: mode === "text-to-morse" ? '2px' : 'normal', color: mode === "text-to-morse" ? '#3b82f6' : '#10b981', wordWrap: 'break-word', margin: 0, minHeight: '24px' }}>
          {resultText || "Output will appear here..."}
        </p>
      </div>
    </div>
  );
}