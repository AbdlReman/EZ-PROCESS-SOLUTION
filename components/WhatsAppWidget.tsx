"use client";

import { useState } from "react";

const WA_NUMBER = "18433091515";

export default function WhatsAppWidget() {
  const [open, setOpen]   = useState(false);
  const [name, setName]   = useState("");

  function startChat() {
    const text = name.trim()
      ? `Hi! I'm ${name.trim()}. I'd like to know more about your services.`
      : "Hi! I'd like to know more about your services.";
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <>
      {/* Popup */}
      {open && (
        <div className="wa-popup">
          <div className="wa-popup-header">
            <div className="wa-popup-header-left">
              <span className="wa-popup-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.528 5.845L.057 23.268a.75.75 0 00.923.924l5.484-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.5-5.24-1.378l-.375-.217-3.884 1.046 1.046-3.823-.234-.389A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </span>
              <div>
                <div className="wa-popup-title">Chat with us</div>
                <div className="wa-popup-sub">on WhatsApp</div>
              </div>
            </div>
            <button className="wa-popup-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>

          <div className="wa-popup-body">
            <p className="wa-popup-prompt">Enter your name to start a conversation:</p>
            <input
              className="wa-popup-input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && startChat()}
              autoFocus
            />
            <button className="wa-popup-btn" onClick={startChat}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.528 5.845L.057 23.268a.75.75 0 00.923.924l5.484-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.5-5.24-1.378l-.375-.217-3.884 1.046 1.046-3.823-.234-.389A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Start Chat
            </button>
          </div>
        </div>
      )}

      {/* Floating button — icon only, no CSS circle */}
      <button
        className={`wa-fab${open ? " wa-fab-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat on WhatsApp"
      >
        {open ? (
          /* Close icon when popup is open */
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          /* Official WhatsApp icon — green shape built into the SVG */
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="29" cy="29" r="29" fill="#25D366"/>
            <path
              d="M29 10.5C18.78 10.5 10.5 18.78 10.5 29c0 3.26.87 6.32 2.38 8.97L10.5 47.5l9.74-2.36A18.42 18.42 0 0029 47.5c10.22 0 18.5-8.28 18.5-18.5S39.22 10.5 29 10.5zm0 33.92a15.35 15.35 0 01-7.83-2.14l-.56-.33-5.82 1.53 1.55-5.69-.37-.58A15.35 15.35 0 0113.58 29c0-8.52 6.9-15.42 15.42-15.42S44.42 20.48 44.42 29 37.52 44.42 29 44.42zm8.45-11.54c-.46-.23-2.73-1.35-3.16-1.5-.42-.16-.73-.23-1.03.23-.31.46-1.19 1.5-1.46 1.81-.27.31-.54.35-1 .12-2.72-1.36-4.5-2.43-6.3-5.51-.48-.82.48-.76 1.36-2.53.15-.31.08-.58-.04-.81-.12-.23-1.03-2.5-1.42-3.42-.38-.9-.76-.77-1.04-.79-.27-.01-.58-.01-.89-.01-.31 0-.81.12-1.23.58-.42.46-1.62 1.58-1.62 3.85 0 2.27 1.66 4.47 1.89 4.78.23.31 3.25 4.97 7.89 6.97 2.93 1.27 4.08 1.37 5.55 1.16.89-.13 2.73-1.12 3.12-2.2.38-1.08.38-2 .27-2.2-.12-.2-.42-.31-.88-.54z"
              fill="white"
            />
          </svg>
        )}
      </button>
    </>
  );
}
