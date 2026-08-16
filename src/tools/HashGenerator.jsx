import React, { useState, useEffect } from 'react';

export default function HashGenerator() {
  const [mode, setMode] = useState("text"); // 'text' or 'file'
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [hashAlgo, setHashAlgo] = useState("SHA-256"); 
  const [hashedText, setHashedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // حالة التحميل للملفات الكبيرة

  useEffect(() => {
    const generateHash = async () => {
      try {
        if (mode === "text") {
          if (!inputText) {
            setHashedText("");
            return;
          }
          const msgUint8 = new TextEncoder().encode(inputText);
          const hashBuffer = await crypto.subtle.digest(hashAlgo, msgUint8);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
          setHashedText(hashHex);
        } else if (mode === "file") {
          if (!selectedFile) {
            setHashedText("");
            return;
          }
          setIsProcessing(true);
          const reader = new FileReader();
          
          reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            const hashBuffer = await crypto.subtle.digest(hashAlgo, arrayBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
            setHashedText(hashHex);
            setIsProcessing(false);
          };
          
          reader.onerror = () => {
            console.error("Error reading file");
            setHashedText("Error reading file...");
            setIsProcessing(false);
          };
          
          reader.readAsArrayBuffer(selectedFile);
        }
      } catch (error) {
        console.error("Hashing failed", error);
        setIsProcessing(false);
      }
    };

    generateHash();
  }, [inputText, selectedFile, hashAlgo, mode]);

  const handleCopy = () => {
    if (!hashedText) return;
    navigator.clipboard.writeText(hashedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', width: '100%', maxWidth: '600px', border: '1px solid #334155' }}>
      <h2 style={{ textAlign: 'center', color: '#f8fafc', marginBottom: '30px', fontSize: '24px' }}>Hash Generator 🧬</h2>

      {/* اختيار الخوارزمية */}
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

      {/* اختيار وضع النص أو الملف */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setMode("text")}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', backgroundColor: mode === "text" ? '#3b82f6' : '#0f172a', color: mode === "text" ? '#fff' : '#94a3b8', border: '1px solid #334155', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📝 Text Mode
        </button>
        <button 
          onClick={() => setMode("file")}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', backgroundColor: mode === "file" ? '#10b981' : '#0f172a', color: mode === "file" ? '#fff' : '#94a3b8', border: '1px solid #334155', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📁 File Mode
        </button>
      </div>
      
      {/* منطقة الإدخال بناءً على الوضع */}
      <div style={{ marginBottom: '20px' }}>
        {mode === "text" ? (
          <>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>Input Text:</label>
            <textarea 
              placeholder="Type any text or password here..."
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              style={{ width: '100%', height: '100px', padding: '15px', fontSize: '16px', backgroundColor: '#0f172a', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', outline: 'none', boxSizing: 'border-box', resize: 'none' }} 
            />
          </>
        ) : (
          <>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>Upload File (Local processing only):</label>
            <div style={{ border: '2px dashed #334155', borderRadius: '8px', padding: '30px', textAlign: 'center', backgroundColor: '#0f172a' }}>
              <input 
                type="file" 
                onChange={handleFileChange} 
                style={{ color: '#94a3b8', width: '100%' }}
              />
              {selectedFile && (
                <p style={{ color: '#10b981', marginTop: '15px', fontSize: '14px', fontWeight: 'bold' }}>
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* عرض النتيجة */}
      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4 style={{ margin: '0', color: '#94a3b8' }}>Result ({hashAlgo}):</h4>
          <button 
            onClick={handleCopy}
            disabled={!hashedText || isProcessing}
            style={{ padding: '6px 12px', backgroundColor: copied ? '#10b981' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: (hashedText && !isProcessing) ? 'pointer' : 'not-allowed', fontSize: '14px', transition: 'background-color 0.3s', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        </div>

        <p style={{ fontSize: '16px', fontFamily: 'monospace', color: '#8b5cf6', wordWrap: 'break-word', margin: 0, minHeight: '24px' }}>
          {isProcessing ? "Processing file..." : (hashedText || "Output will appear here...")}
        </p>
      </div>
    </div>
  );
}