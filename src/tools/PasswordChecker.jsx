import React, { useState } from 'react';

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [leakResult, setLeakResult] = useState(null);

  // 1. Password Criteria Checks
  const isLongEnough = password.length >= 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // 2. Score Calculation
  let score = 0;
  if (isLongEnough) score++;
  if (hasLowerCase) score++;
  if (hasUpperCase) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;

  // 3. UI Text & Color Configuration
  let strengthText = "Waiting for password...";
  let progressColor = "#334155"; // Dark placeholder

  if (password.length > 0) {
    if (score <= 2) {
      strengthText = "Weak 🔴";
      progressColor = "#ef4444"; // Modern Red
    } else if (score === 3 || score === 4) {
      strengthText = "Medium 🟡";
      progressColor = "#f59e0b"; // Modern Orange
    } else if (score === 5) {
      strengthText = "Strong 🟢";
      progressColor = "#10b981"; // Modern Green
    }
  }

  const progressWidth = `${(score / 5) * 100}%`;

  // 4. SHA-1 Hashing for k-Anonymity
  const sha1 = async (str) => {
    const buffer = new TextEncoder("utf-8").encode(str);
    const hash = await crypto.subtle.digest("SHA-1", buffer);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('').toUpperCase();
  };

  // 5. Pwned Passwords API Integration
  const checkPwned = async () => {
    if (!password) return;
    setIsChecking(true);
    setLeakResult(null);

    try {
      const hash = await sha1(password);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const text = await response.text();

      const lines = text.split('\n');
      let isLeaked = false;
      let count = 0;

      for (let line of lines) {
        const [hashSuffix, matchCount] = line.split(':');
        if (hashSuffix === suffix) {
          isLeaked = true;
          count = matchCount.trim();
          break;
        }
      }

      setLeakResult(isLeaked ? count : 0);
    } catch (error) {
      console.error("API Connection Error:", error);
    }

    setIsChecking(false);
  };

  return (
    <div style={{ 
      backgroundColor: '#1e293b', // Dark Card Background
      padding: '40px', 
      borderRadius: '16px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)', 
      width: '100%', 
      maxWidth: '500px',
      border: '1px solid #334155'
    }}>
      
      <h2 style={{ textAlign: 'center', color: '#f8fafc', marginBottom: '30px', fontSize: '24px' }}>
        Password Strength Checker 🔒
      </h2>
      
      {/* Input Field & Toggle Button */}
      <div style={{ display: 'flex', alignItems: 'stretch', marginBottom: '20px' }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setLeakResult(null); // Reset leak warning on typing
          }}
          style={{ 
            flex: 1, 
            padding: '14px', 
            fontSize: '16px', 
            backgroundColor: '#0f172a', // Darker input background
            color: '#f8fafc',
            border: '1px solid #334155', 
            borderRadius: '8px 0 0 8px', 
            outline: 'none',
          }}
        />
        <button 
          onClick={() => setShowPassword(!showPassword)}
          style={{ 
            padding: '0 20px', 
            fontSize: '18px', 
            cursor: 'pointer', 
            backgroundColor: '#334155', 
            color: '#f8fafc',
            border: '1px solid #334155', 
            borderLeft: 'none', 
            borderRadius: '0 8px 8px 0',
            transition: 'background-color 0.2s'
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      {/* Modern Progress Bar */}
      <div style={{ 
        height: '22px', 
        backgroundColor: '#0f172a', 
        borderRadius: '11px', 
        marginBottom: '15px', 
        overflow: 'hidden',
        border: '1px solid #334155'
      }}>
        <div style={{ 
          height: '100%', 
          width: progressWidth, 
          backgroundColor: progressColor, 
          transition: 'width 0.4s ease, background-color 0.4s ease', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: '#ffffff', 
          fontSize: '12px', 
          fontWeight: 'bold',
          boxShadow: score > 0 ? `0 0 10px ${progressColor}80` : 'none' // Glow effect
        }}>
          {score > 0 ? `${(score / 5) * 100}%` : ""}
        </div>
      </div>

      <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#94a3b8', marginBottom: '25px', fontSize: '15px' }}>
        {strengthText}
      </p>

      {/* Cyber Leak API Button */}
      <button 
        onClick={checkPwned}
        disabled={!password || isChecking}
        style={{ 
          width: '100%', 
          padding: '12px', 
          marginBottom: '20px', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          color: '#ffffff', 
          backgroundColor: '#3b82f6', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: password && !isChecking ? 'pointer' : 'not-allowed', 
          opacity: (!password || isChecking) ? 0.5 : 1,
          transition: 'all 0.3s ease',
          boxShadow: password && !isChecking ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none'
        }}
      >
        {isChecking ? "Scanning Database..." : "🔍 Check for Data Leaks"}
      </button>

      {/* API Result Alert Box */}
      {leakResult !== null && (
        <div style={{ 
          padding: '15px', 
          marginBottom: '25px', 
          borderRadius: '8px', 
          textAlign: 'center', 
          fontWeight: '600', 
          fontSize: '14px',
          backgroundColor: leakResult > 0 ? '#450a0a' : '#064e3b', // Dark red vs Dark green
          color: leakResult > 0 ? '#fca5a5' : '#6ee7b7',
          border: `1px solid ${leakResult > 0 ? '#ef4444' : '#10b981'}` 
        }}>
          {leakResult > 0 
            ? `⚠️ WARNING: This password has been exposed ${leakResult.toLocaleString()} times in data breaches. Do not use it!` 
            : "✅ EXCELLENT: This password has never been found in any known data breaches."}
        </div>
      )}

      {/* Password Requirements List */}
      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '10px', fontSize: '14px', border: '1px solid #334155' }}>
        <p style={{ margin: '0 0 15px 0', fontWeight: 'bold', color: '#f8fafc' }}>
          Strong Password Requirements:
        </p>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, lineHeight: '2.2' }}>
          <li style={{ color: isLongEnough ? '#10b981' : '#64748b', transition: 'color 0.3s' }}>
            {isLongEnough ? "✅" : "⚪"} At least 8 characters
          </li>
          <li style={{ color: hasLowerCase ? '#10b981' : '#64748b', transition: 'color 0.3s' }}>
            {hasLowerCase ? "✅" : "⚪"} Lowercase letters (a-z)
          </li>
          <li style={{ color: hasUpperCase ? '#10b981' : '#64748b', transition: 'color 0.3s' }}>
            {hasUpperCase ? "✅" : "⚪"} Uppercase letters (A-Z)
          </li>
          <li style={{ color: hasNumber ? '#10b981' : '#64748b', transition: 'color 0.3s' }}>
            {hasNumber ? "✅" : "⚪"} Numbers (0-9)
          </li>
          <li style={{ color: hasSymbol ? '#10b981' : '#64748b', transition: 'color 0.3s' }}>
            {hasSymbol ? "✅" : "⚪"} Special characters (!@#$%)
          </li>
        </ul>
      </div>
      
    </div>
  );
}