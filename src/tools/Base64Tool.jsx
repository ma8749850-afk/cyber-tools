import React, { useState, useEffect } from 'react';

export default function Base64Tool() {
  const [mode, setMode] = useState("encode"); // 'encode' or 'decode'
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      setError(false);
      return;
    }

    try {
      if (mode === "encode") {
        // تشفير آمن يدعم اللغة العربية والإيموجي
        const encoded = btoa(unescape(encodeURIComponent(inputText)));
        setOutputText(encoded);
        setError(false);
      } else {
        // فك تشفير آمن
        const decoded = decodeURIComponent(escape(atob(inputText)));
        setOutputText(decoded);
        setError(false);
      }
    } catch (err) {
      setOutputText("⚠️ Invalid input format for decoding!");
      setError(true);
    }
  }, [inputText, mode]);

  const handleCopy = () => {
    if (!outputText || error) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', width: '100%', maxWidth: '600px', border: '1px solid #334155' }}>
      <h2 style={{ textAlign: 'center', color: '#f8fafc', marginBottom: '30px', fontSize: '24px' }}>Base64 Encoder / Decoder 🔄</h2>

      {/* اختيار وضع التشفير أو فك التشفير */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => { setMode("encode"); setInputText(""); }}
          style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: mode === "encode" ? '#3b82f6' : '#0f172a', color: mode === "encode" ? '#fff' : '#94a3b8', border: '1px solid #334155', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s ease' }}
        >
          🔐 Encode (تشفير)
        </button>
        <button 
          onClick={() => { setMode("decode"); setInputText(""); }}
          style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: mode === "decode" ? '#f59e0b' : '#0f172a', color: mode === "decode" ? '#fff' : '#94a3b8', border: '1px solid #334155', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s ease' }}
        >
          🔓 Decode (فك تشفير)
        </button>
      </div>
      
      {/* منطقة الإدخال */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>
          {mode === "encode" ? "Enter text to encode:" : "Enter Base64 to decode:"}
        </label>
        <textarea 
          placeholder={mode === "encode" ? "Type anything here..." : "Paste Base64 string ending with = or =="}
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          style={{ width: '100%', height: '120px', padding: '15px', fontSize: '16px', backgroundColor: '#0f172a', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', outline: 'none', boxSizing: 'border-box', resize: 'none', fontFamily: mode === "decode" ? 'monospace' : 'inherit' }} 
        />
      </div>

      {/* منطقة النتيجة */}
      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: `1px solid ${error ? '#ef4444' : '#334155'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4 style={{ margin: '0', color: error ? '#ef4444' : '#94a3b8' }}>Result:</h4>
          <button 
            onClick={handleCopy}
            disabled={!outputText || error}
            style={{ padding: '6px 12px', backgroundColor: copied ? '#10b981' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: (outputText && !error) ? 'pointer' : 'not-allowed', fontSize: '14px', transition: 'background-color 0.3s', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        </div>

        <p style={{ fontSize: '16px', fontFamily: 'monospace', color: error ? '#ef4444' : '#8b5cf6', wordWrap: 'break-word', margin: 0, minHeight: '24px' }}>
          {outputText || "Output will appear here..."}
        </p>
      </div>
    </div>
  );
}