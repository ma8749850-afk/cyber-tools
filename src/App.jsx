import React, { useState } from 'react';
import CaesarCipher from './tools/CaesarCipher';
import PasswordChecker from './tools/PasswordChecker';
import KeyboardFixer from './tools/KeyboardFixer';
import MorseTranslator from './tools/MorseTranslator'; // 1. استدعاء مورس
import './App.css'; 

export default function App() {
  const [activeTool, setActiveTool] = useState("caesar");

  const colors = {
    primary: '#3b82f6',
    textMuted: '#94a3b8',
    border: '#334155'
  };

  return (
    <div className="app-container">
      
      <div className="sidebar">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, color: colors.primary, fontSize: '26px', fontWeight: 'bold', letterSpacing: '1px' }}>
            <span style={{ fontSize: '28px' }}>🛡️</span> CyberHub
          </h2>
          <p style={{ color: colors.textMuted, fontSize: '14px', marginTop: '8px' }}>
            Cybersecurity Tools
          </p>
        </div>
        
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <li>
            <button onClick={() => setActiveTool("caesar")} style={{ width: '100%', padding: '14px 20px', cursor: 'pointer', backgroundColor: activeTool === "caesar" ? colors.primary : 'transparent', color: activeTool === "caesar" ? '#fff' : colors.textMuted, border: `1px solid ${activeTool === "caesar" ? colors.primary : colors.border}`, borderRadius: '10px', textAlign: 'left', fontSize: '16px', fontWeight: '600', transition: 'all 0.3s ease', boxShadow: activeTool === "caesar" ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none' }}>
              🔐 Caesar Cipher
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTool("password")} style={{ width: '100%', padding: '14px 20px', cursor: 'pointer', backgroundColor: activeTool === "password" ? colors.primary : 'transparent', color: activeTool === "password" ? '#fff' : colors.textMuted, border: `1px solid ${activeTool === "password" ? colors.primary : colors.border}`, borderRadius: '10px', textAlign: 'left', fontSize: '16px', fontWeight: '600', transition: 'all 0.3s ease', boxShadow: activeTool === "password" ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none' }}>
              🔒 Password Checker
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTool("keyboard")} style={{ width: '100%', padding: '14px 20px', cursor: 'pointer', backgroundColor: activeTool === "keyboard" ? colors.primary : 'transparent', color: activeTool === "keyboard" ? '#fff' : colors.textMuted, border: `1px solid ${activeTool === "keyboard" ? colors.primary : colors.border}`, borderRadius: '10px', textAlign: 'left', fontSize: '16px', fontWeight: '600', transition: 'all 0.3s ease', boxShadow: activeTool === "keyboard" ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none' }}>
              ⌨️ Keyboard Fixer
            </button>
          </li>
          {/* 2. زرار مترجم مورس */}
          <li>
            <button onClick={() => setActiveTool("morse")} style={{ width: '100%', padding: '14px 20px', cursor: 'pointer', backgroundColor: activeTool === "morse" ? colors.primary : 'transparent', color: activeTool === "morse" ? '#fff' : colors.textMuted, border: `1px solid ${activeTool === "morse" ? colors.primary : colors.border}`, borderRadius: '10px', textAlign: 'left', fontSize: '16px', fontWeight: '600', transition: 'all 0.3s ease', boxShadow: activeTool === "morse" ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none' }}>
              📻 Morse Translator
            </button>
          </li>
        </ul>
      </div>

      <div className="main-content">
        {activeTool === "caesar" && <CaesarCipher />}
        {activeTool === "password" && <PasswordChecker />} 
        {activeTool === "keyboard" && <KeyboardFixer />} 
        {/* 3. عرض مورس */}
        {activeTool === "morse" && <MorseTranslator />} 
      </div>

    </div>
  );
}