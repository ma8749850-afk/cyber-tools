import React, { useState } from 'react';

export default function CaesarCipher() {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState("encrypt"); // 'encrypt' or 'decrypt'

  const applyCipher = (str, shiftAmount, isDecrypt) => {
    const actualShift = isDecrypt ? -shiftAmount : shiftAmount;
    
    // الأبجدية العربية مجمعة عشان التشفير يدعمها
    const arabicAlphabet = "ابتثجحخدذرزسشصضطظعغفقكلمنهويأإآةىئؤء";
    const arLength = arabicAlphabet.length;

    return str.split('').map(char => {
      // 1. معالجة الحروف الإنجليزية
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const base = isUpperCase ? 65 : 97;
        
        const shiftCalc = ((actualShift % 26) + 26) % 26;
        return String.fromCharCode(((code - base + shiftCalc) % 26) + base);
      }
      // 2. معالجة الحروف العربية
      else if (arabicAlphabet.includes(char)) {
        const index = arabicAlphabet.indexOf(char);
        const shiftCalc = ((actualShift % arLength) + arLength) % arLength;
        return arabicAlphabet[(index + shiftCalc) % arLength];
      }
      // 3. المسافات والرموز والأرقام ترجع زي ما هي
      return char;
    }).join('');
  };

  const resultText = applyCipher(text, shift, mode === "decrypt");

  return (
    <div style={{ 
      backgroundColor: '#1e293b', 
      padding: '40px', 
      borderRadius: '16px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)', 
      width: '100%', 
      maxWidth: '600px',
      border: '1px solid #334155'
    }}>
      
      <h2 style={{ textAlign: 'center', color: '#f8fafc', marginBottom: '30px', fontSize: '24px' }}>
        Caesar Cipher Tool 🔐
      </h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setMode("encrypt")}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: `1px solid ${mode === "encrypt" ? '#3b82f6' : '#334155'}`,
            backgroundColor: mode === "encrypt" ? '#3b82f6' : 'transparent',
            color: mode === "encrypt" ? '#fff' : '#94a3b8',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: mode === "encrypt" ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none'
          }}
        >
          🔒 Encrypt
        </button>
        <button 
          onClick={() => setMode("decrypt")}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: `1px solid ${mode === "decrypt" ? '#10b981' : '#334155'}`,
            backgroundColor: mode === "decrypt" ? '#10b981' : 'transparent',
            color: mode === "decrypt" ? '#fff' : '#94a3b8',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: mode === "decrypt" ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none'
          }}
        >
          🔓 Decrypt
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>
          Input Text (English / Arabic):
        </label>
        <textarea
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ 
            width: '100%', 
            height: '120px', 
            padding: '15px', 
            fontSize: '16px', 
            backgroundColor: '#0f172a', 
            color: '#f8fafc',
            border: '1px solid #334155', 
            borderRadius: '8px', 
            outline: 'none',
            boxSizing: 'border-box',
            resize: 'none'
          }}
        />
      </div>

      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>
          Shift Key (Number):
        </label>
        <input
          type="number"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          style={{ 
            width: '100%', 
            padding: '12px 15px', 
            fontSize: '16px', 
            backgroundColor: '#0f172a', 
            color: '#f8fafc',
            border: '1px solid #334155', 
            borderRadius: '8px', 
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ 
        backgroundColor: '#0f172a', 
        padding: '20px', 
        borderRadius: '8px', 
        border: '1px solid #334155',
        position: 'relative'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#94a3b8' }}>Result:</h4>
        <p style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: mode === "encrypt" ? '#3b82f6' : '#10b981',
          wordWrap: 'break-word',
          margin: 0,
          minHeight: '24px'
        }}>
          {resultText || "Output will appear here..."}
        </p>
      </div>

    </div>
  );
}