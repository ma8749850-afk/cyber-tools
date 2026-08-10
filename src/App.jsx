import React, { useState } from 'react';
import CaesarCipher from './tools/CaesarCipher';
import PasswordChecker from './tools/PasswordChecker'; 

export default function App() {
  const [activeTool, setActiveTool] = useState("caesar");

  // Modern Dark Theme Colors
  const colors = {
    bg: '#0f172a',
    sidebar: '#1e293b',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    primary: '#3b82f6',
    border: '#334155'
  };

  return (
    <div style={{ 
      fontFamily: "'Segoe UI', Roboto, Tahoma, sans-serif", 
      direction: 'ltr', // Changed to Left-to-Right
      minHeight: '100vh', 
      display: 'flex', 
      backgroundColor: colors.bg,
      color: colors.textMain
    }}>
      
      {/* Sidebar */}
      <div style={{ 
        width: '280px', 
        backgroundColor: colors.sidebar, 
        padding: '30px 20px',
        borderRight: `1px solid ${colors.border}`, // Border on the right now
        boxShadow: '4px 0 25px rgba(0,0,0,0.5)', // Adjusted shadow direction
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ margin: 0, color: colors.primary, fontSize: '26px', fontWeight: 'bold', letterSpacing: '1px' }}>
            <span style={{ fontSize: '28px' }}>🛡️</span> CyberHub
          </h2>
          <p style={{ color: colors.textMuted, fontSize: '14px', marginTop: '8px' }}>
            Cybersecurity Tools
          </p>
        </div>
        
        {/* Tool Buttons */}
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <li>
            <button 
              onClick={() => setActiveTool("caesar")}
              style={{ 
                width: '100%', 
                padding: '14px 20px', 
                cursor: 'pointer', 
                backgroundColor: activeTool === "caesar" ? colors.primary : 'transparent', 
                color: activeTool === "caesar" ? '#fff' : colors.textMuted, 
                border: `1px solid ${activeTool === "caesar" ? colors.primary : colors.border}`, 
                borderRadius: '10px', 
                textAlign: 'left', // Aligned text to the left
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: activeTool === "caesar" ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none' 
              }}
            >
              🔐 Caesar Cipher
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTool("password")}
              style={{ 
                width: '100%', 
                padding: '14px 20px', 
                cursor: 'pointer', 
                backgroundColor: activeTool === "password" ? colors.primary : 'transparent', 
                color: activeTool === "password" ? '#fff' : colors.textMuted, 
                border: `1px solid ${activeTool === "password" ? colors.primary : colors.border}`, 
                borderRadius: '10px', 
                textAlign: 'left', // Aligned text to the left
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: activeTool === "password" ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none'
              }}
            >
              🔒 Password Checker
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ 
        flex: 1, 
        padding: '50px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        overflowY: 'auto'
      }}>
        {activeTool === "caesar" && <CaesarCipher />}
        {activeTool === "password" && <PasswordChecker />} 
      </div>

    </div>
  );
}