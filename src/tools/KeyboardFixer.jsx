import React, { useState } from 'react';

export default function KeyboardFixer() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState("ar-to-en"); 
  const [copied, setCopied] = useState(false); // حالة الزرار للنسخ

  const enToArMap = {
    'q':'ض', 'w':'ص', 'e':'ث', 'r':'ق', 't':'ف', 'y':'غ', 'u':'ع', 'i':'ه', 'o':'خ', 'p':'ح', '[':'ج', ']':'د',
    'a':'ش', 's':'س', 'd':'ي', 'f':'ب', 'g':'ل', 'h':'ا', 'j':'ت', 'k':'ن', 'l':'م', ';':'ك', "'":'ط',
    'z':'ئ', 'x':'ء', 'c':'ؤ', 'v':'ر', 'b':'لا', 'n':'ى', 'm':'ة', ',':'و', '.':'ز', '/':'ظ', '`':'ذ',
    'Q':'َ', 'W':'ً', 'E':'ُ', 'R':'ٌ', 'T':'لإ', 'Y':'إ', 'U':'‘', 'I':'÷', 'O':'×', 'P':'؛', '{':'<', '}':'>',
    'A':'ِ', 'S':'ٍ', 'D':']', 'F':'[', 'G':'لأ', 'H':'أ', 'J':'ـ', 'K':'،', 'L':'/', ':':':', '"':'"',
    'Z':'~', 'X':'ْ', 'C':'{', 'V':'}', 'B':'لآ', 'N':'آ', 'M':'\'', '<':',', '>':'.', '?':'؟', '~':'ّ'
  };

  const arToEnMap = {
    'ض':'q', 'ص':'w', 'ث':'e', 'ق':'r', 'ف':'t', 'غ':'y', 'ع':'u', 'ه':'i', 'خ':'o', 'ح':'p', 'ج':'[', 'د':']',
    'ش':'a', 'س':'s', 'ي':'d', 'ب':'f', 'ل':'g', 'ا':'h', 'ت':'j', 'ن':'k', 'م':'l', 'ك':';', 'ط':"'",
    'ئ':'z', 'ء':'x', 'ؤ':'c', 'ر':'v', 'ى':'n', 'ة':'m', 'و':',', 'ز':'.', 'ظ':'/', 'ذ':'`',
    'َ':'Q', 'ً':'W', 'ُ':'E', 'ٌ':'R', 'إ':'Y', '‘':'U', '÷':'I', '×':'O', '؛':'P', '<':'{', '>':'}',
    'ِ':'A', 'ٍ':'S', ']':'D', '[':'F', 'أ':'H', 'ـ':'J', '،':'K', '/':'L', ':':':', '"':'"',
    '~':'Z', 'ْ':'X', '{':'C', '}':'V', 'آ':'N', '\'':'M', ',':'<', '.':'>', '؟':'?'
  };

  const fixText = (text, currentMode) => {
    if (!text) return "";
    let processedText = text;
    if (currentMode === "ar-to-en") {
      processedText = processedText.replace(/لا/g, 'b').replace(/لأ/g, 'G').replace(/لإ/g, 'T').replace(/لآ/g, 'B');
      return processedText.split('').map(char => arToEnMap[char] || char).join('');
    } else {
      return processedText.split('').map(char => enToArMap[char] || char).join('');
    }
  };

  const resultText = fixText(inputText, mode);

  // دالة النسخ
  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', width: '100%', maxWidth: '600px', border: '1px solid #334155' }}>
      <h2 style={{ textAlign: 'center', color: '#f8fafc', marginBottom: '30px', fontSize: '24px' }}>Keyboard Layout Fixer ⌨️</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setMode("en-to-ar")} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${mode === "en-to-ar" ? '#3b82f6' : '#334155'}`, backgroundColor: mode === "en-to-ar" ? '#3b82f6' : 'transparent', color: mode === "en-to-ar" ? '#fff' : '#94a3b8', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: mode === "en-to-ar" ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none' }}>
          English to Arabic
        </button>
        <button onClick={() => setMode("ar-to-en")} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${mode === "ar-to-en" ? '#10b981' : '#334155'}`, backgroundColor: mode === "ar-to-en" ? '#10b981' : 'transparent', color: mode === "ar-to-en" ? '#fff' : '#94a3b8', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: mode === "ar-to-en" ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none' }}>
          Arabic to English
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>Wrong Text:</label>
        <textarea placeholder="Type the gibberish text here... (e.g. .d ;]i legh)" value={inputText} onChange={(e) => setInputText(e.target.value)} style={{ width: '100%', height: '100px', padding: '15px', fontSize: '16px', backgroundColor: '#0f172a', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', outline: 'none', boxSizing: 'border-box', resize: 'none' }} />
      </div>

      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
        {/* صف عنوان النتيجة مع زرار النسخ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#94a3b8' }}>Fixed Text:</h4>
          <button 
            onClick={handleCopy}
            disabled={!resultText}
            style={{ padding: '6px 12px', backgroundColor: copied ? '#10b981' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: resultText ? 'pointer' : 'not-allowed', fontSize: '14px', transition: 'background-color 0.3s', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        </div>

        <p style={{ fontSize: '18px', fontWeight: 'bold', color: mode === "en-to-ar" ? '#3b82f6' : '#10b981', wordWrap: 'break-word', margin: 0, minHeight: '24px' }}>
          {resultText || "Output will appear here..."}
        </p>
      </div>
    </div>
  );
}