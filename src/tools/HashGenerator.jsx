import React, { useState, useEffect } from 'react';

export default function HashGenerator() {
  const [inputText, setInputText] = useState("");
  const [hashAlgo, setHashAlgo] = useState("SHA-256"); // SHA-1, SHA-256, SHA-384, SHA-512
  const [hashedText, setHashedText] = useState("");
  const [copied, setCopied] = useState(false);

  // دالة توليد الهاش باستخدام Web Crypto API
  const generateHash = async (text, algorithm) => {
    if (!text) {
      setHashedText("");
      return;
    }
    try {
      // تحويل النص لمصفوفة بايتات
      const msgUint8 = new TextEncoder().encode(text);
      // حساب الهاش (بياخد وقت بسيط جدا فبنستخدم await)
      const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
      // تحويل النتيجة لنص (Hex)
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setHashedText(hashHex);
    } catch (error) {
      console.error("Hashing failed", error);
    }
  };

  // أي تغيير في النص أو الخوارزمية، هيتحدث الهاش تلقائياً
  useEffect(() => {
    generateHash(inputText, hashAlgo);
  }, [inputText, hashAlgo]);

  const handleCopy = () => {
    if (!hashedText) return;
    navigator.clipboard.writeText(hashedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', width: '100%', maxWidth: '600px', border: '1px solid #334155' }}>
      <h2 style={{ textAlign: 'center', color: '#f8fafc', marginBottom: '30px', fontSize: '24px' }}>Hash Generator 🧬</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['SHA-1', 'SHA-256', 'SHA-512'].map((algo) => (
          <button 
            key={algo}
            onClick={() => setHashAlgo(algo)}
            style={{
              flex: 1, padding: '10px', borderRadius: '8px', 
              border: `1px solid ${hashAlgo === algo ? '#8b5cf6' : '#334155'}`,
              backgroundColor: hashAlgo === algo ? '#8b5cf6' : 'transparent',
              color: hashAlgo === algo ? '#fff' : '#94a3b8',
              fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease',
              boxShadow: hashAlgo === algo ? '0 4px 15px rgba(139, 92, 246, 0.4)' : 'none'
            }}
          >
            {algo}
          </button>
        ))}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>Input Text:</label>
        <textarea 
          placeholder="Type any text or password here..."
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          style={{ width: '100%', height: '100px', padding: '15px', fontSize: '16px', backgroundColor: '#0f172a', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', outline: 'none', boxSizing: 'border-box', resize: 'none' }} 
        />
      </div>

      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4 style={{ margin: '0', color: '#94a3b8' }}>Result ({hashAlgo}):</h4>
          <button 
            onClick={handleCopy}
            disabled={!hashedText}
            style={{ padding: '6px 12px', backgroundColor: copied ? '#10b981' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: hashedText ? 'pointer' : 'not-allowed', fontSize: '14px', transition: 'background-color 0.3s', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        </div>

        <p style={{ fontSize: '16px', fontFamily: 'monospace', color: '#8b5cf6', wordWrap: 'break-word', margin: 0, minHeight: '24px' }}>
          {hashedText || "Output will appear here..."}
        </p>
      </div>
    </div>
  );
}